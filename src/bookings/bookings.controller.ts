import tryCatch from "../shared/services/tryCatch";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorFormatter from "../shared/services/errorFormater";
import { v4 as uuidv4 } from 'uuid';
import createBookingSchema from "./validations/bookingSchema";
import bookingService from "./booking.service";
import logger from "../shared/config/logger";

 class bookingsController{

    createBooking = tryCatch(async(req:Request,res:Response) =>{
        const id = uuidv4()
        const validationResult = createBookingSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error.details[0].message);
        }
        const {userId,showtimeId,seatnumber,totalPrice} = validationResult.value;
        const dto = {id,userId,showtimeId,seatnumber,totalPrice}
        await bookingService.createBooking(dto)
        logger.info('booking created succesfully')
        return res.status(StatusCodes.CREATED).json({msg:'booking created successfully'})
    })

    verifyBookingId = tryCatch(async(req:Request,res:Response)=>{
        const bookingId = req.params.bookingId
        const verified = await bookingService.verifyBooking(bookingId)
        if (!verified) return res.status(StatusCodes.BAD_REQUEST).json('error occured while verifing your booking')
        logger.info('booking verified successfully')
        return res.status(StatusCodes.CREATED).json({msg:'booking verified successfully'})
    })
}

export default new bookingsController