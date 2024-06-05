import express, { Router } from 'express';
import seatsController from './seats.controller';
const router:Router = express.Router()

router.route("/createSeats").post(seatsController.createSeatByShowtimes)
router.route("/fetchSeats/:showtimeId").get(seatsController.fetchSeatByShowtimes)
router.route("/chooseSeat/:showtimeId/:seatnumber").get(seatsController.chooseSeatByShowtimes)
router.route("/availableSeats/:showtimeId").get(seatsController.fetchAvailableSeats)
router.route("/unAvailableSeats/:showtimeId").get(seatsController.fetchUnAvailableSeats)

export default router