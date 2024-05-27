import express, { Router } from 'express';
import { theaterController } from './theater.controller';
const router:Router = express.Router()
const theater = theaterController.prototype

router.route("/create").post(theater.createTheater)
router.route("/get").put(theater.getTheater)
router.route("/all").post(theater.getAllTheater)
router.route("/delete").delete(theater.deleteTheater)