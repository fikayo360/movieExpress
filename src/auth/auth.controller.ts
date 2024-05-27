import { authServices } from './auth.service';
import tryCatch from '../shared/services/tryCatch';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import errorFormatter from '../shared/services/errorFormater';
import {signupSchema,loginSchema,forgotPasswordSchema,changePasswordSchema,refreshToken} from './validations/joi/userValidations'
import { v4 as uuidv4 } from 'uuid';
import { FoundUser } from '../shared/interfaces/foundUser';
import { sendResetToken } from '../shared/services/sendEmail';
import logger from '../shared/config/logger';

export class authController {
    constructor(private authService:authServices){}

    signup = tryCatch(async(req:Request,res:Response)=>{
        const userId = uuidv4()
        const validationResult = signupSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {email,username,password} = validationResult.value;
        const isExisting = this.authService.userExists(email,username)
        if(await isExisting){
            logger.error('User already exists')
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('user already exists',StatusCodes.BAD_REQUEST))
        } 
        const hashPassword = this.authService.hashPassword(password,10)
        const role = 'user'
        const user = {id:userId,email,username,password:hashPassword,role}
        await this.authService.createUser(user)
        logger.info('User created successfully')
        return res.status(StatusCodes.OK).json('user created successfully')
    })

    signin = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = loginSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {username,password} = validationResult.value;
        const findUser = await this.authService.findUsername(username)
        const foundUser:FoundUser = findUser.dataValues
        if(!findUser){
            logger.error('user does not exist')
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter("that user does not exist",StatusCodes.BAD_REQUEST))
        }

        const currentPassword = foundUser.password as unknown as string
        if(!this.authService.comparePasswords(password,currentPassword)){
            logger.error('wrong password')
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('wrong password',StatusCodes.BAD_REQUEST))
        }
        const { password:foundUserPassword, ...others } = foundUser;
        const {id,email} = others
        const userId = id as unknown as string
        const emailAddress = email as unknown as string
        const tokens = this.authService.getTokens(userId,emailAddress)
        return res.status(StatusCodes.OK).json(tokens)
    })

    forgotPassword = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = forgotPasswordSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {email} = validationResult.value;
        const findUser = await this.authService.findEmail(email)
        const foundUser:FoundUser = findUser.dataValues
        if (!foundUser){
            logger.error('that user does not exist')
            return res.status(404).json(errorFormatter('that user does not exist',StatusCodes.BAD_REQUEST))
        }
        const reset = sendResetToken(email)
        await this.authService.updateToken(reset,email)
        logger.info('reset token sent succesfully')
        return res.status(StatusCodes.OK).json(errorFormatter('Reset token sent successfully',StatusCodes.OK))
    })

    changePassword = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = changePasswordSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {token,email,newPassword} = validationResult.value;
        const findUser = await this.authService.findEmail(email)
        const foundUser:FoundUser = findUser.dataValues
        const {id} = foundUser
        const userId = id as unknown as string
        if(foundUser.resettoken === token){
            const newHashed = this.authService.hashPassword(newPassword,10)
            await this.authService.changePassword(newHashed,userId)
            logger.info('password updated succesfully')
            return res.status(StatusCodes.OK).json(errorFormatter('password updated successfully',StatusCodes.OK));
        }
        logger.error('wrong user')
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('wrong user',StatusCodes.BAD_REQUEST));
    })

    refreshToken = tryCatch(async(req:Request,res:Response)=>{
        const validationResult = refreshToken.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {userId,rt} = validationResult.value;
        const findUser = await this.authService.findId(userId)
        const foundUser:FoundUser = findUser?.dataValues
        if (!foundUser || !foundUser.hashedRt){
            logger.error('user not found')
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('user not found',StatusCodes.BAD_REQUEST));
        }
        const hashedRt = foundUser.hashedRt as unknown as string
        const email = foundUser.email as unknown as string
        const compareRt = this.authService.compareRt(rt,hashedRt)
        if(!compareRt){
            logger.error('the refresh token is not valid')
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('the refresh token is not valid',StatusCodes.BAD_REQUEST));
        }
        const getTokens = this.authService.getTokens(userId,email)
        await this.authService.updatedRefreshTokenHash(userId,rt)
        return res.status(StatusCodes.OK).json(getTokens)
    })

    logout = tryCatch(async(req:Request,res:Response)=>{
        const userId = req.user.userId
        await this.authService.updateRtToNull(userId)
        logger.info('logged out succesfully')
        return res.status(StatusCodes.OK).json(errorFormatter('logged out succesfully',StatusCodes.OK))
    })
}
