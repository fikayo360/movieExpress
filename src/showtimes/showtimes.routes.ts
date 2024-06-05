import express, { Router } from 'express';
import showtimesController from './showtimes.controller';
const router:Router = express.Router()
import { authUser } from '../shared/middleware/auth';

router.route("/create").post(authUser,showtimesController.createShowtime)
router.route("/getShowtimes/:movieId").get(authUser,showtimesController.getShowtime)
router.route("/delete/:id").delete(authUser,showtimesController.deleteShowtime)

export default router