import { bookingDb } from "./booking.repos";
import { BookingType } from "./types/booking.types";

export class bookingsService {
    constructor(private readonly db:bookingDb){}

    async createBooking(dto:BookingType):Promise<any>{
        return this.db.createBooking(dto)
    }

    async verifyBooking(bookingId:string):Promise<any>{
        return this.db.findBookingById(bookingId)
    }
}