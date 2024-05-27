import { seatDB } from "./seats.repos";
import { SeatType } from "./types/seat.type";

export class seatService {
    constructor(private readonly db:seatDB){}
  
    async createSeatByShowtimes(seat:SeatType){
        return this.db.createShowtimesSeat(seat)
    }

    async fetchSeatByShowtimes(showtimeId:string){
        return this.db.getShowtimesSeat(showtimeId)
    }

    async chooseSeatByShowtimes(seatId:string,seatNo:number){
        return this.db.chooseSeat(seatId,seatNo)
    }

    fetchAvailableSeats(showtimeId:string){
        return this.db.fetchAvailableSeats(showtimeId)
    }

    fetchUnAvailableSeats(showtimeId:string){
        return this.db.fetchUnAvailableSeats(showtimeId)
    }
}