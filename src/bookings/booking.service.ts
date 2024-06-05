import bookingRepos from "./booking.repos";
import { BookingType } from "./types/booking.types";

class bookingsService {

    async createBooking(dto:BookingType):Promise<any>{
        return bookingRepos.createBooking(dto)
    }

    async verifyBooking(bookingId:string):Promise<any>{
        return bookingRepos.findBookingById(bookingId)
    }
}

export default new bookingsService