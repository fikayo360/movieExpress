import Showtime from "../database/models/Showtime";
import { ShowtimesType } from "./types/showtimes";

 class showtimeDb{

    createShowtime(dto:ShowtimesType){
        const {id,movieId,theaterId,startTime,endTime} = dto
        console.log({id,movieId,theaterId,startTime,endTime} );
        return Showtime.create({
            id,movieId,theaterId,startTime,endTime
        })
    }
 
    deleteShowtimes(id:string){
        return Showtime.destroy({
            where:{
                id:id
            }
        })
    }

    getShowtimes(movieId:string){
        return Showtime.findAll({
            where:{
                movieId:movieId
            }
        })
    }
}

export default new showtimeDb