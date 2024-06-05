import theaterRepos from "./theater.repos";
import { TheaterType } from "./types";

class theaterService {

    async createTheater(theater:TheaterType){
        return await theaterRepos.createTheater(theater)
    }

    async deleteTheater(id:string):Promise<any>{
        return await theaterRepos.deleteTheater(id)
    }

    async getTheater(id:string):Promise<any>{
       return await theaterRepos.getSingleTheater(id)
    }

    async getAllTheaters():Promise<any>{
        return await theaterRepos.getAllTheaters()
    }
}

export default new theaterService