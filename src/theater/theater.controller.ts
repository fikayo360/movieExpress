import tryCatch from "../shared/services/tryCatch";
import { Request,Response } from "express";
import createTheaterSchema from "./validations/joi/createTheaterSchema";
import { v4 as uuidv4 } from 'uuid';
import errorFormatter from "../shared/services/errorFormater";
import { StatusCodes } from "http-status-codes";
import { theaterService } from "./theater.service";
import logger from "../shared/config/logger";

export class theaterController{
    constructor(private theaterService:theaterService){}

     createTheater = tryCatch(async(req:Request,res:Response)=>{
        const id = uuidv4()
        const validationResult = createTheaterSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {name,location,seatingCapacity} = validationResult.value;
        const theater = {id,name,location,seatingCapacity}
        await this.theaterService.createTheater(theater)
        logger.info('theater created succesfully')
        return res.status(StatusCodes.CREATED).json('theater created successfully')
     })

    getTheater = tryCatch(async(req:Request,res:Response)=>{
         const {id} = req.params
         const theater = await this.theaterService.getTheater(id)
         return res.status(StatusCodes.OK).json(theater)
     })

    getAllTheater = tryCatch(async(req:Request,res:Response)=>{
        const theaters = await this.theaterService.getAllTheaters()
        return res.status(StatusCodes.OK).json(theaters)
    })

    deleteTheater = tryCatch(async(req:Request,res:Response)=>{
        const {id} = req.params
        await this.theaterService.deleteTheater(id)
        logger.info('theater deleted successfully')
        return res.status(StatusCodes.OK).json('theater deleted successfully')
    })
}