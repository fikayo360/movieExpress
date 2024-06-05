import logger from '../config/logger';
import { TokenPayload } from '../interfaces/tokenPayload';
import {Request, Response,NextFunction} from 'express'
import jwt, {  Secret } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
const isTokenValid = require('../services/isTokenValid')

export const authUser = async (req:Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      logger.error('no token! access denied')
      return res.status(400).json("no token! access denied");
    }
  
    const tokenData = authHeader.split(" ");
    const token = tokenData[1]; 
    try {
      const { sub,email,role } =  isTokenValid(token) as TokenPayload;
      console.log({ sub,email,role } );
      req.user = { sub,email,role } 
      next();
    } catch (error) {
        logger.error('token expired')
        res.status(StatusCodes.UNAUTHORIZED).json("Token expired");
    }
};

export const isAdmin = async (req:Request, res: Response, next: NextFunction) =>{
  const user = req.user
  if(user.role === "admin"){
    logger.info(`welcome admin ${user.sub}`)
    next();
  }
  else{
    return res.status(400).json("not an admn access denied");
  }
}
