import { SeatType } from "./types/seat.type";
import { Seat } from "../database/models/Seat";

class seatDB {

    createShowtimesSeat(seat:SeatType){
        const {id,theaterId,seatnumber,showtimeId} = seat
        return Seat.create({
            id,theaterId,seatnumber,showtimeId
        })
    }

    getShowtimesSeat(showtimeId:string){
        return Seat.findOne({
            where:{
                showtimeId:showtimeId
            }
        })
    }

    fetchAvailableSeats(showtimeId:string){
        return Seat.findAll({
            where:{
                showtimeId:showtimeId,
                availability:true
            }
        })
    }

    fetchUnAvailableSeats(showtimeId:string){
        return Seat.findAll({
            where:{
                showtimeId:showtimeId,
                availability:false
            }
        })
    }

    chooseSeat(showtimeId:string,seatnumber:number){
        return Seat.update({
            availability:false
        },{
            where:{
                showtimeId:showtimeId,
                seatnumber:seatnumber
            }
        })
    }
}

export default new seatDB