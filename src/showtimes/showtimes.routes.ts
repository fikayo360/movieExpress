import express, { Router } from 'express';
import { showtimeController } from './showtimes.controller';
const router:Router = express.Router()
const showtimes = showtimeController.prototype

router.route("/create").post(showtimes.createShowtime)
router.route("/getShowtimes").put(showtimes.getShowtime)
router.route("/delete").post(showtimes.deleteShowtime)