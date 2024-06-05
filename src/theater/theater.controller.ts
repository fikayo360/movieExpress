import tryCatch from "../shared/services/tryCatch";
import { Request,Response } from "express";
import createTheaterSchema from "./validations/joi/createTheaterSchema";
import { v4 as uuidv4 } from 'uuid';
import errorFormatter from "../shared/services/errorFormater";
import { StatusCodes } from "http-status-codes";
import logger from "../shared/config/logger";
import theaterService from "./theater.service";

class theaterController{

     createTheater = tryCatch(async(req:Request,res:Response)=>{
        const id = uuidv4()
        const validationResult = createTheaterSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(StatusCodes.BAD_REQUEST).json(validationResult.error.details[0].message);
        }
        const {name,location,seatingCapacity} = validationResult.value;
        const theater = {id,name,location,seatingCapacity}
        await theaterService.createTheater(theater)
        logger.info('theater created succesfully')
        return res.status(StatusCodes.CREATED).json({msg:'theater created successfully'})
     })

    getTheater = tryCatch(async(req:Request,res:Response)=>{
         const {id} = req.params
         const theater = await theaterService.getTheater(id)
         return res.status(StatusCodes.OK).json(theater)
     })

    getAllTheater = tryCatch(async(req:Request,res:Response)=>{
        const theaters = await theaterService.getAllTheaters()
        return res.status(StatusCodes.OK).json(theaters)
    })

    deleteTheater = tryCatch(async(req:Request,res:Response)=>{
        const {id} = req.params
        await theaterService.deleteTheater(id)
        logger.info('theater deleted successfully')
        return res.status(StatusCodes.OK).json({msg:'theater deleted successfully'})
    })
}

export default new theaterController