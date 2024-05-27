import { where } from "sequelize";
import { Movie } from "../database/models/Movie";
import { MovieType } from './types/movieType';

export class movieDB{
    createMovie(movie:MovieType){
        const {id,title,genre,duration,rating,posterimg,expiryDate,theaterId} = movie
        return Movie.create({
            id,title,genre,duration,rating,posterimg,expiryDate,theaterId
        })
    }
    updateMovie(updateData:MovieType,movieId:string){
        return Movie.update(updateData,{
            where:{
                id:movieId
            }
        })
    }
    deleteMovie(movieId:string){
        return Movie.destroy({
            where:{
                id:movieId
            }
        })
    }
    findAllMovies(){
        return Movie.findAll({})
    }


    getMoviesByTitle(title:string){
        return Movie.findAll({
            where:{
                title:title,
            }
        })
    }

    
    getMoviesByDuration(duration:number){
        return Movie.findAll({
            where:{
                duration:duration,
            }
        })
    }

    
    getMoviesByRating(rating:number){
        return Movie.findAll({
            where:{
                rating:rating,
            }
        })
    }

    getMoviesByGenre(genre:string){
        return Movie.findAll({
            where:{
                genre:genre,
            }
        })
    }

    getMoviesByTheater(theaterId:string){
        return Movie.findAll({
            where:{
                theaterId:theaterId,
            }
        })
    }
}