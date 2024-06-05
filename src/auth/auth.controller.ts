import authServices from './auth.services';
import tryCatch from '../shared/services/tryCatch';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import errorFormatter from '../shared/services/errorFormater';
import {signupSchema,loginSchema,forgotPasswordSchema,changePasswordSchema,refreshToken} from './validations/joi/userValidations'
import { v4 as uuidv4 } from 'uuid';
import { FoundUser } from '../shared/interfaces/foundUser';
import { sendResetToken } from '../shared/services/sendEmail';
import logger from '../shared/config/logger';

const auth = authServices

 class authController {
    
    signup = tryCatch(async(req:Request,res:Response)=>{
        const userId = uuidv4()
        console.log(req.body);
        const validationResult = signupSchema.validate(req.body)

        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {email,username,password} = validationResult.value;
        
        const isExisting = auth.userExists(email,username)
        if(await isExisting){
            logger.error('User already exists')
            return res.status(StatusCodes.BAD_REQUEST).json('user already exists')
        } 
        const hashPassword = auth.hashPassword(password,10)
        const role = 'user'
        const user = {id:userId,email,username,password:hashPassword,role}
        const tokens = await auth.createUser(user,res)
        let accesstoken = tokens.access_token
        logger.info('User created successfully')
        return res.status(StatusCodes.OK).json({msg:'user created successfully',accesstoken})
    })

    signin = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = loginSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {username,password} = validationResult.value;
        const findUser = await auth.findUsername(username)
        const foundUser:FoundUser = findUser.dataValues
        if(!findUser){
            logger.error('user does not exist')
            return res.status(StatusCodes.BAD_REQUEST).json("that user does not exist")
        }

        const currentPassword = foundUser.password as unknown as string
        if(!auth.comparePasswords(password,currentPassword)){
            logger.error('wrong password')
            return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
        }
        const { password:foundUserPassword, ...others } = foundUser;
        const {id,email} = others
        console.log(id,email);
        const userId = id as unknown as string
        const emailAddress = email as unknown as string
        const tokens = auth.getTokens(userId,emailAddress,res)
        await auth.updatedRefreshTokenHash(userId,tokens.refresh_token)
        return res.status(StatusCodes.OK).json(tokens)
    })

    forgotPassword = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = forgotPasswordSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0]);
        }
        const {email} = validationResult.value;
        const findUser = await auth.findEmail(email)
        const foundUser:FoundUser = findUser.dataValues
        if (!foundUser){
            logger.error('that user does not exist')
            return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
        }
        const userId = foundUser.id
        const reset = sendResetToken(email)
        console.log(reset);
        await auth.updateToken(reset,userId)
        logger.info('reset token sent succesfully')
        return res.status(StatusCodes.OK).json({msg:'Reset token sent successfully'})
    })

    changePassword = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = changePasswordSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {token,email,newPassword} = validationResult.value;
        const findUser = await auth.findEmail(email)
        const foundUser:FoundUser = findUser.dataValues
        const userId = foundUser.id 
        if(foundUser.resettoken === token){
            const newHashed = auth.hashPassword(newPassword,10)
            await auth.changePassword(newHashed,userId)
            logger.info('password updated succesfully')
            return res.status(StatusCodes.OK).json('password updated successfully')
        }
        logger.error('wrong user')
        return res.status(StatusCodes.BAD_REQUEST).json('wrong user');
    })

    refreshToken = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = refreshToken.validate(req.body)
        if (validationResult.error) {
            return res.status(StatusCodes.BAD_REQUEST).json(validationResult.error.details[0].message);
        }
        const {userId,rt} = validationResult.value;
        const findUser = await auth.findId(userId)
        const foundUser:FoundUser = findUser?.dataValues
        if (!foundUser || !foundUser.hashedRt){
            logger.error('user not found')
            return res.status(StatusCodes.BAD_REQUEST).json('user not found');
        }
        const hashedRt = foundUser.hashedRt 
        const email = foundUser.email
        const compareRt = auth.compareRt(rt,hashedRt)
        if(!compareRt){
            logger.error('the refresh token is not valid')
            return res.status(StatusCodes.BAD_REQUEST).json('the refresh token is not valid');
        }
        const getTokens = auth.getTokens(userId,email,res)
        await auth.updatedRefreshTokenHash(userId,rt)
        return res.status(StatusCodes.OK).json(getTokens)
    })

    logout = tryCatch(async(req:Request,res:Response)=>{
        const {userId} = req.body
        await auth.updateRtToNull(userId)
        logger.info('logged out succesfully')
        return res.status(StatusCodes.OK).json('logged out succesfully')
    })
}

export default new authController()