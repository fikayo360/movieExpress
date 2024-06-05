import express, { Router } from 'express';
import bookingsController from './bookings.controller';
import { authUser } from '../shared/middleware/auth';

const router:Router = express.Router()

router.route("/create").post(authUser,bookingsController.createBooking)
router.route("/verify/:bookingId").get(authUser,bookingsController.verifyBookingId)

export default router