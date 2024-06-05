import express, { Router } from 'express';
import movieController from './movie.controller';
const router:Router = express.Router()
import { authUser } from '../shared/middleware/auth';
router.route("/create").post(authUser,movieController.createMovie)
router.route("/update/:movieId").put(authUser,movieController.updateMovie)
router.route("/search").get(authUser,movieController.searchMovie)
router.route("/delete/:movieId").delete(authUser,movieController.deleteMovie)
router.route("/theaterMovies/:theaterId").get(authUser,movieController.getMoviesByTheaterId)

export default router