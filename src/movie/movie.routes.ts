import express, { Router } from 'express';
import { movieController } from './movie.controller';
const router:Router = express.Router()
const movie = movieController.prototype

router.route("/create").post(movie.createMovie)
router.route("/update").put(movie.updateMovie)
router.route("/search").post(movie.searchMovie)
router.route("/delete").delete(movie.deleteMovie)
router.route("/theaterMovies").get(movie.getMoviesByTheaterId)
