import express, { Router } from 'express';
import { bookingsController } from './bookings.controller';
const router:Router = express.Router()
const booking = bookingsController.prototype

router.route("/create").post(booking.createBooking)
router.route("/verify").get(booking.verifyBookingId)
