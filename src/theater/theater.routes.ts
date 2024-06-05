import express, { Router } from 'express';
import theaterController from './theater.controller';
import { authUser } from '../shared/middleware/auth';
const router:Router = express.Router()

router.route("/create").post(authUser,theaterController.createTheater)
router.route("/get/:id").get(authUser,theaterController.getTheater)
router.route("/all").get(authUser,theaterController.getAllTheater)
router.route("/delete/:id").delete(authUser,theaterController.deleteTheater)

export default router