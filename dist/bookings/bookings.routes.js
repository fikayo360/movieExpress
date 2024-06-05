"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bookings_controller_1 = __importDefault(require("./bookings.controller"));
var auth_1 = require("../shared/middleware/auth");
var router = express_1.default.Router();
router.route("/create").post(auth_1.authUser, bookings_controller_1.default.createBooking);
router.route("/verify/:bookingId").get(auth_1.authUser, bookings_controller_1.default.verifyBookingId);
exports.default = router;
