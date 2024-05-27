import { SeatType } from "./types/seat.type";
import { Seats } from "../database/models/Seat";

export class seatDB {

    createShowtimesSeat(seat:SeatType){
        const {theaterId,seatNumber,availability,showtimeId} = seat
        return Seats.create({
            theaterId,seatNumber,availability,showtimeId
        })
    }

    getShowtimesSeat(showtimeId:string){
        return Seats.findOne({
            where:{
                showtimeId:showtimeId
            }
        })
    }

    fetchAvailableSeats(showtimeId:string){
        return Seats.findAll({
            where:{
                showtimeId:showtimeId,
                availability:true
            }
        })
    }

    fetchUnAvailableSeats(showtimeId:string){
        return Seats.findAll({
            where:{
                showtimeId:showtimeId,
                availability:false
            }
        })
    }

    chooseSeat(showtimeId:string,seatNo:number){
        return Seats.update({
            availability:false
        },{
            where:{
                showtimeId:showtimeId,
                seatNo:seatNo
            }
        })
    }
}