import { Theater } from "../database/models/Theater";
import { TheaterType } from "./types";

export class theaterDB {

    createTheater(theater:TheaterType){
        const {id,name,location,seatingCapacity} = theater
        return Theater.create({
            id,name,location,seatingCapacity
        })
    }

    getAllTheaters(){
        return Theater.findAll({})
    }

    getSingleTheater(id:string){
        return Theater.findOne({
            where:{
                id:id,
            }
        })
    }

    deleteTheater(id:string){
        return Theater.destroy({
            where:{
                id:id,
            }
        })
    }
}