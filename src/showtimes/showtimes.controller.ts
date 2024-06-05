import { StatusCodes } from "http-status-codes";
import tryCatch from "../shared/services/tryCatch";
import { Request,Response } from "express";
import errorFormatter from "../shared/services/errorFormater";
import { v4 as uuidv4 } from 'uuid';
import logger from "../shared/config/logger";
import createShowtimeSchema from "./validations/createShowtimeValidation";
import  showTimeService  from './showtimes.service';

 class showtimeController{

    createShowtime = tryCatch(async(req:Request,res:Response)=>{
        const id = uuidv4()
        const validationResult = createShowtimeSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {movieId,theaterId,startTime,endTime} = validationResult.value;
        const dto = {id,movieId,theaterId,startTime,endTime}
         await showTimeService.createShowtimes(dto)
        logger.info('showtime created succesfully')
        return res.status(StatusCodes.CREATED).json('showtime created successfully')
    })

    getShowtime = tryCatch(async(req:Request,res:Response)=>{
        const movieId = req.params.movieId
        const results = await showTimeService.getShowtimes(movieId)
        if(!results || results.length === 0) return res.status(StatusCodes.BAD_REQUEST).json('showtime not found')
        return res.status(StatusCodes.OK).json(results)
    })

    deleteShowtime = tryCatch(async(req:Request,res:Response)=>{
        const id = req.params.id
        await showTimeService.deleteShowtimes(id)
        logger.error('showtime deleted succesfully')
        return res.status(StatusCodes.CREATED).json('deleted successfully')
    })
}

export default new showtimeController