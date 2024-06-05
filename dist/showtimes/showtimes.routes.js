"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var showtimes_controller_1 = __importDefault(require("./showtimes.controller"));
var router = express_1.default.Router();
var auth_1 = require("../shared/middleware/auth");
router.route("/create").post(auth_1.authUser, showtimes_controller_1.default.createShowtime);
router.route("/getShowtimes/:movieId").get(auth_1.authUser, showtimes_controller_1.default.getShowtime);
router.route("/delete/:id").delete(auth_1.authUser, showtimes_controller_1.default.deleteShowtime);
exports.default = router;
