
import * as bcrypt from 'bcryptjs'
import { Tokens } from '../shared/interfaces/tokenPayload';
import { jwtPayload } from '../shared/interfaces/tokenPayload';
import jwt, {  Secret } from 'jsonwebtoken';
import { response,Response} from 'express';
import authRepo from './auth.repo';
const auth = authRepo

 class authServices{

    async userExists(username:string,email:string){
        const userExists = await auth.findUsername(username)
        const emailExists = await auth.findEmail(email)
        if(userExists && emailExists){
            return true
        }
        return false
    }

    hashPassword(password:string,salt:number){
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword
    }

    async createUser(payload:{id:string,username:string,email:string,password:string,role:string},res:Response){
        auth.createUser(payload)
        return this.getTokens(payload.id,payload.email,res)
    }

     getTokens(userId: string, email: string,res:Response):Tokens{
      console.log(process.env.JWT_SECRET);
        const defaultRole = 'user'
        const jwtPayload: jwtPayload = {
          sub: userId,
          email: email,
          role: defaultRole
        };
        const at = jwt.sign(jwtPayload,process.env.JWT_SECRET as Secret,{
            expiresIn:process.env.JWT_LIFETIME
        })
        const rt = jwt.sign(jwtPayload,process.env.RT_SECRET as Secret,{
            expiresIn:process.env.RT_LIFETIME
        })
        res.cookie('refreshToken', rt, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
          });

        return {
          access_token: at,
          refresh_token: rt,
        };
      }

      async findUsername(username: string):Promise<any>{
        return auth.findUsername(username) 
     }

     async findEmail(email: string):Promise<any>{
        return auth.findEmail(email) 
     }

     comparePasswords(current:string,old:string){
        return bcrypt.compareSync(current,old)
     }

     compareRt(current:string,old:string){
        return current === old
     }

     async updateToken(reset:string,userId:string){
         return auth.updateResetToken(reset,userId)
     }

     async changePassword(newPassword:string,id:string){
          return auth.changePassword(newPassword,id)
     }

     async findId(id:string){
        return auth.findId(id)
     }

     async updatedRefreshTokenHash(id:string,hash:string){
        return auth.updateRefreshTokenHash(id,hash)
     }

     async updateRtToNull(userId:string){
        return auth.updateRefreshTokenToNull(userId)
     }
}

export default new authServices()