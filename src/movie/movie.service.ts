import { movieDB } from "./movie.repos";
import { MovieType,MovieQueryType } from "./types";

export class movieService{
    constructor(private readonly db:movieDB){}

    async createMovie(movie:MovieType):Promise<any>{
        return this.db.createMovie(movie)
    }

    async updateMovie(updateData:MovieType,movieId:string):Promise<any>{
        return this.db.updateMovie(updateData,movieId)
    }

    async deleteMovie(movieId:string){
        return this.db.deleteMovie(movieId)
    }
    
    async searchMovie(query:MovieQueryType){
        const title = query.title
        const duration = query.duration
        const rating = query.rating
        const genre = query.genre

        if(title){
            return this.db.getMoviesByTitle(title)
        }
        if(duration){
            return this.db.getMoviesByDuration(duration)
        }
        if(rating){
            return this.db.getMoviesByRating(rating)
        }
        if(genre){
            return this.db.getMoviesByGenre(genre)
        }

        return this.db.findAllMovies()
    }

    getMoviesByTheaterId(theaterId: string){
        return this.db.getMoviesByTheater(theaterId)
    }
}