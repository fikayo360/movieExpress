import tryCatch from "../shared/services/tryCatch";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorFormatter from "../shared/services/errorFormater";
import { v4 as uuidv4 } from 'uuid';
import createBookingSchema from "./validations/bookingSchema";
import { bookingsService } from "./booking.service";
import logger from "../shared/config/logger";

export class bookingsController{

    constructor(private bookingService:bookingsService){}

    createBooking = tryCatch(async(req:Request,res:Response) =>{
        const id = uuidv4()
        const validationResult = createBookingSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {userId,theaterId,showtimeId,availability,seatNumber} = validationResult.value;
        const dto = {id,userId,theaterId,showtimeId,availability,seatNumber}
        await this.bookingService.createBooking(dto)
        logger.info('booking created succesfully')
        return res.status(StatusCodes.CREATED).json('booking created successfully')
    })

    verifyBookingId = tryCatch(async(req:Request,res:Response)=>{
        const bookingId = req.params.bookingId
        await this.bookingService.verifyBooking(bookingId)
        logger.info('booking verified successfully')
        return res.status(StatusCodes.CREATED).json('booking verified successfully')
    })
}