import { authDb } from './auth.repo';
import * as bcrypt from 'bcryptjs'
import { Tokens } from '../shared/interfaces/tokenPayload';
import { jwtPayload } from '../shared/interfaces/tokenPayload';
import jwt, {  Secret } from 'jsonwebtoken';
import { response } from 'express';
import { FindUser } from '../shared/interfaces/foundUser';

export class authServices{
    constructor(private readonly authDb:authDb){}

    async userExists(username:string,email:string){
        const userExists = await this.authDb.findUsername(username)
        const emailExists = await this.authDb.findEmail(email)
        if(userExists && emailExists){
            return true
        }
        return false
    }

    hashPassword(password:string,salt:number){
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword
    }

    async createUser(payload:{id:string,username:string,email:string,password:string,role:string}){
        this.authDb.createUser(payload)
        this.getTokens(payload.id,payload.email)
    }

     getTokens(userId: string, email: string):Tokens {
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
        response.cookie('refreshToken', rt, {
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
        return this.authDb.findUsername(username) 
     }

     async findEmail(email: string):Promise<any>{
        return this.authDb.findEmail(email) 
     }

     comparePasswords(current:string,old:string){
        return bcrypt.compareSync(current,old)
     }

     compareRt(current:string,old:string){
        return bcrypt.compareSync(current,old)
     }

     async updateToken(reset:string,id:string){
         return this.authDb.updateResetToken(reset,id)
     }

     async changePassword(newPassword:string,id:string){
          return this.authDb.changePassword(newPassword,id)
     }

     async findId(id:string){
        return this.authDb.findId(id)
     }

     async updatedRefreshTokenHash(id:string,hash:string){
        return this.authDb.updateRefreshTokenHash(id,hash)
     }

     async updateRtToNull(id:string){
        return this.authDb.updateRefreshTokenToNull(id)
     }
}
