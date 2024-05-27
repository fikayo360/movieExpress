import { ShowtimeDb } from "./showtimes.repos";
import { ShowtimesType } from "./types/showtimes";
import { Seats } from "../database/models/Seat";

export class showTimeService {
    constructor(private readonly db:ShowtimeDb){}

    async createShowtimes(dto:ShowtimesType):Promise<any>{
        return this.db.createShowtime(dto)
    }

    async getShowtimes(movieId:string):Promise<any>{
        return this.db.getShowtimes(movieId)
    }

    async deleteShowtimes(id:string):Promise<any>{
        return this.db.deleteShowtimes(id)
    }

    async createShowtimesSeats(theaterId:string,showtimeId:string){
        const noOfSeats = 100
        for(let i=1;i<=noOfSeats;i++){
            await Seats.create({
                theaterId,
                seatnumber: i,
                availability: true,
                showtimeId
            })

        }
    }
}