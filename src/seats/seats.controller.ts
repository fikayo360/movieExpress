import tryCatch from "../shared/services/tryCatch"
import { StatusCodes } from "http-status-codes"
import errorFormatter from "../shared/services/errorFormater"
import seatsService from "./seats.service";
import createSeatSchema from "./validations/createSeat";
import { v4 as uuidv4 } from 'uuid';
import { Response,Request } from "express";
import logger from "../shared/config/logger";

 class seatController {

    createSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const id = uuidv4()
        const validationResult = createSeatSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {theaterId,seatnumber,showtimeId} = validationResult.value
        const seat = {id,theaterId,seatnumber,showtimeId}
        await seatsService.createSeatByShowtimes(seat)
        logger.info('seat created succesfully')
        return res.status(StatusCodes.OK).json('seat created successfully')
    })

    fetchSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const results = await seatsService.fetchSeatByShowtimes(showtimeId)
        if (!results) return res.status(StatusCodes.BAD_REQUEST).json('no seats found')
        return res.status(StatusCodes.OK).json(results)
    })

    chooseSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seatnumber  = req.params.seatnumber
        await seatsService.chooseSeatByShowtimes(showtimeId, parseInt(seatnumber))
        logger.info('seat chosen succesfully')
        return res.status(StatusCodes.OK).json('seat chosen successfully')
    })

    fetchAvailableSeats = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seats = await seatsService.fetchAvailableSeats(showtimeId)
        return res.status(StatusCodes.OK).json(seats)
    })

    fetchUnAvailableSeats = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seats = await seatsService.fetchUnAvailableSeats(showtimeId)
        return res.status(StatusCodes.OK).json(seats)
    })

} 

export default new seatController