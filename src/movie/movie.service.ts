import movieRepos from "./movie.repos";
import { MovieType,MovieQueryType } from "./types";

 class movieService{

    async createMovie(movie:MovieType):Promise<any>{
        return movieRepos.createMovie(movie)
    }

    async updateMovie(updateData:MovieType,movieId:string):Promise<any>{
        return movieRepos.updateMovie(updateData,movieId)
    }

    async deleteMovie(movieId:string){
        return movieRepos.deleteMovie(movieId)
    }
    
    async searchMovie(query:MovieQueryType){
        const title = query.title
        const duration = query.duration
        const rating = query.rating
        const genre = query.genre

        if(title){
            return movieRepos.getMoviesByTitle(title)
        }
        if(duration){
            return movieRepos.getMoviesByDuration(duration)
        }
        if(rating){
            return movieRepos.getMoviesByRating(rating)
        }
        if(genre){
            return movieRepos.getMoviesByGenre(genre)
        }

        return movieRepos.findAllMovies()
    }

    getMoviesByTheaterId(theaterId: string){
        return movieRepos.getMoviesByTheater(theaterId)
    }
}

export default new movieService