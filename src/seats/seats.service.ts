import seatsRepos from "./seats.repos";
import { SeatType } from "./types/seat.type";

 class seatService {
  
    async createSeatByShowtimes(seat:SeatType):Promise<any>{
        return seatsRepos.createShowtimesSeat(seat)
    }

    async fetchSeatByShowtimes(showtimeId:string):Promise<any>{
        return seatsRepos.getShowtimesSeat(showtimeId)
    }

    async chooseSeatByShowtimes(seatId:string,seatNo:number):Promise<any>{
        return seatsRepos.chooseSeat(seatId,seatNo)
    }

    fetchAvailableSeats(showtimeId:string):Promise<any>{
        return seatsRepos.fetchAvailableSeats(showtimeId)
    }

    fetchUnAvailableSeats(showtimeId:string):Promise<any>{
        return seatsRepos.fetchUnAvailableSeats(showtimeId)
    }
}

export default new seatService