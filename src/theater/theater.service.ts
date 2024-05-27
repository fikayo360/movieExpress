import { theaterDB } from "./theater.repos";
import { TheaterType } from "./types";

export class theaterService {
    constructor(private readonly db:theaterDB){}

    async createTheater(theater:TheaterType){
        return await this.db.createTheater(theater)
    }

    async deleteTheater(id:string):Promise<any>{
        return await this.db.deleteTheater(id)
    }

    async getTheater(id:string):Promise<TheaterType>{
       return await this.db.getSingleTheater(id)
    }

    async getAllTheaters():Promise<TheaterType[]>{
        return await this.db.getAllTheaters()
    }
}