import { Showtimes } from "../database/models/Showtimes";
import { ShowtimesType } from "./types/showtimes";

export class ShowtimeDb{

    createShowtime(dto:ShowtimesType){
        const {id,movieId,theaterId,startTime,endTime} = dto
        return Showtimes.create({
            id,movieId,theaterId,startTime,endTime
        })
    }
 
    deleteShowtimes(id:string){
        return Showtimes.destroy({
            where:{
                id:id
            }
        })
    }

    getShowtimes(movieId:string){
        return Showtimes.findAll({
            where:{
                id:movieId
            }
        })
    }
}