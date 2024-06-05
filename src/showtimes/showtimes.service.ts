import showtimesRepos from "./showtimes.repos";
import { ShowtimesType } from "./types/showtimes";
import { Seat } from "../database/models/Seat";
import { v4 as uuidv4 } from 'uuid';

 class showTimeService {

    async createShowtimes(dto:ShowtimesType):Promise<any>{
        return showtimesRepos.createShowtime(dto)
    }

    async getShowtimes(movieId:string):Promise<any>{
        return showtimesRepos.getShowtimes(movieId)
    }

    async deleteShowtimes(id:string):Promise<any>{
        return showtimesRepos.deleteShowtimes(id)
    }
}

export default new showTimeService