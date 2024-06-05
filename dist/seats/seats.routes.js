"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var seats_controller_1 = __importDefault(require("./seats.controller"));
var router = express_1.default.Router();
router.route("/createSeats").post(seats_controller_1.default.createSeatByShowtimes);
router.route("/fetchSeats/:showtimeId").get(seats_controller_1.default.fetchSeatByShowtimes);
router.route("/chooseSeat/:showtimeId/:seatnumber").get(seats_controller_1.default.chooseSeatByShowtimes);
router.route("/availableSeats/:showtimeId").get(seats_controller_1.default.fetchAvailableSeats);
router.route("/unAvailableSeats/:showtimeId").get(seats_controller_1.default.fetchUnAvailableSeats);
exports.default = router;
