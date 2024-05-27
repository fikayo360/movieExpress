import express, { Router } from 'express';
import { seatController } from './seats.controller';
const router:Router = express.Router()
const seats = seatController.prototype

router.route("/createSeats").post(seats.createSeatByShowtimes)
router.route("/fetchSeats").get(seats.fetchSeatByShowtimes)
router.route("/chooseSeat").get(seats.chooseSeatByShowtimes)
router.route("/availableSeats").get(seats.fetchAvailableSeats)
router.route("/unAvailableSeats").get(seats.fetchUnAvailableSeats)