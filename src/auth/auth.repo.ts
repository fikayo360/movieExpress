import { User } from "../database/models/User";

 class authDb {

    findUsername(username:string){
        return User.findOne({where:{username:username}})
    }

    findEmail(email:string){
        return User.findOne({where:{email:email}})
    }

    createUser(payload:{id:string,username:string,email:string,password:string,role:string}){
        const {id,username,email,password,role} = payload
        return User.create({
            id,username,email,password,role
          });
    }
    
    updateResetToken(reset:string,userId:string){
        return User.update({
            resettoken: reset
          }, {
            where: {
                id: userId
            }
          });
    }

    changePassword(newPassword:string,id:string){
        return User.update({
            resettoken: null,
            password:newPassword
          }, {
            where: {
              id:id
            }
          });
    }

    findId(userId:string){
        return User.findOne({where:{id:userId}})
    }

    updateRefreshTokenHash(id:string,hash:string){
        return User.update({
            hashedRt:hash
        },{
            where:{
                id:id
            }
        })
    }

    updateRefreshTokenToNull(userId:string){
        return User.update({
            hashedRt:null
        },{
            where:{
                id:userId
            }
        })
    }
}

export default new authDb()