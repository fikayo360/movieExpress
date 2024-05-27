import tryCatch from "../shared/services/tryCatch"
import { StatusCodes } from "http-status-codes"
import errorFormatter from "../shared/services/errorFormater"
import { seatService } from './seats.service';
import createSeatSchema from "./validations/createSeat";
import { v4 as uuidv4 } from 'uuid';
import { Response,Request } from "express";
import logger from "../shared/config/logger";

export class seatController {
    constructor(private seatService:seatService){}

    createSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const id = uuidv4()
        const validationResult = createSeatSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {theaterId,seatNumber,availability,showtimeId} = validationResult.value
        const seat = {id,theaterId,seatNumber,availability,showtimeId}
        await this.seatService.createSeatByShowtimes(seat)
        logger.info('seat created succesfully')
        return res.status(StatusCodes.OK).json('seat created successfully')
    })

    fetchSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const results = await this.seatService.fetchSeatByShowtimes(showtimeId)
        return res.status(StatusCodes.OK).json(results)
    })

    chooseSeatByShowtimes = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seatNo = req.body.seatNo
        await this.seatService.chooseSeatByShowtimes(showtimeId, seatNo)
        logger.info('seat chosen succesfully')
        return res.status(StatusCodes.OK).json('seat chosen successfully')
    })

    fetchAvailableSeats = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seats = await this.seatService.fetchAvailableSeats(showtimeId)
        return res.status(StatusCodes.OK).json(seats)
    })

    fetchUnAvailableSeats = tryCatch(async(req:Request,res:Response)=>{
        const showtimeId = req.params.showtimeId
        const seats = await this.seatService.fetchUnAvailableSeats(showtimeId)
        return res.status(StatusCodes.OK).json(seats)
    })

} 