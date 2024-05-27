import createMovieSchema from "./validations/createMovieSchema";
import { StatusCodes } from "http-status-codes";
import errorFormatter from "../shared/services/errorFormater";
import { movieService } from "./movie.service";
import { v4 as uuidv4 } from 'uuid';
import { Request,Response } from "express";
import tryCatch from "../shared/services/tryCatch";
import { MovieQueryType } from './types/movieQuery';
import logger from "../shared/config/logger";

export class movieController{
    constructor(private movieService:movieService){}

     createMovie = tryCatch(async(req:Request,res:Response) => {
        const id = uuidv4()
        const validationResult = createMovieSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {title,genre,duration,rating,posterimg,expiryDate,theaterId} = validationResult.value;
        const movie = {id,title,genre,duration,rating,posterimg,expiryDate,theaterId}
        await this.movieService.createMovie(movie)
        logger.info('movie created successfully')
        return res.status(StatusCodes.CREATED).json('movie successfully created')
    }
    )
    
     updateMovie = tryCatch(async(req:Request,res:Response)=> {
        const movieId = req.params.movieId
        const validationResult = createMovieSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const updateData = validationResult.value
        await this.movieService.updateMovie(updateData,movieId)
        logger.info('movie updated successfully')
        return res.status(StatusCodes.OK).json('movie successfully updated')
    })

    deleteMovie = tryCatch(async(req:Request,res:Response)=>{
        const movieId = req.params.movieId
        await this.movieService.deleteMovie(movieId)
        logger.info(`Movie deleted successfully`)
        return res.status(StatusCodes.OK).json('movie successfully deleted')
    })

    searchMovie = tryCatch(async(req:Request,res:Response)=>{
        const query = req.query as unknown as MovieQueryType
        const searchResults = await this.movieService.searchMovie(query)
        return res.status(StatusCodes.OK).json(searchResults)
    })
    
    getMoviesByTheaterId = tryCatch(async(req:Request,res:Response)=> {
        const theaterId = req.params.theaterId
        const searchResults = await this.movieService.getMoviesByTheaterId(theaterId)
        return res.status(StatusCodes.OK).json(searchResults)
    })
}