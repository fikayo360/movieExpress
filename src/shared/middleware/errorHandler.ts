const appError = require('../services/appError')
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
const errorFormat = require('../services/errorFormater')

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    
    if (err instanceof appError) {
      logger.error(err.message)
      return res.status(err.statusCode).json(errorFormat(err.message,err.statusCode));
    }

    logger.error('something went wrong')
    return res.status(500).send("Something went wrong");
}

export default ErrorHandler