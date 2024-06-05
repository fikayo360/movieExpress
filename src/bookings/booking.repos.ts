import { where } from "sequelize";
import Booking from "../database/models/Booking";
import { BookingType } from "./types/booking.types";

class bookingDb {
    createBooking(dto:BookingType){
        const {id,userId,showtimeId,seatnumber,totalPrice} = dto
        console.log({id,userId,showtimeId,seatnumber,totalPrice});
        return Booking.create({
            id,userId,showtimeId,seatnumber,totalPrice
        })
    }

    findBookingById(bookingId:string){
        return Booking.findAll({
            where:{
                id:bookingId,
            }
        })
    }
}

export default new bookingDb