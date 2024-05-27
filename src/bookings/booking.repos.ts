import { where } from "sequelize";
import Bookings from "../database/models/Bookings";
import { BookingType } from "./types/booking.types";

export class bookingDb {
    createBooking(dto:BookingType){
        const {id,userId,theaterId,showtimeId,availability,seatNumber} = dto
        return Bookings.create({
            id,userId,theaterId,showtimeId,availability,seatNumber
        })
    }

    findBookingById(bookingId:string){
        return Bookings.findAll({
            where:{
                id:bookingId,
            }
        })
    }
}