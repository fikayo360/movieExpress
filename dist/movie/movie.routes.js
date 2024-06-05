"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movie_controller_1 = __importDefault(require("./movie.controller"));
var router = express_1.default.Router();
var auth_1 = require("../shared/middleware/auth");
router.route("/create").post(auth_1.authUser, movie_controller_1.default.createMovie);
router.route("/update/:movieId").put(auth_1.authUser, movie_controller_1.default.updateMovie);
router.route("/search").get(auth_1.authUser, movie_controller_1.default.searchMovie);
router.route("/delete/:movieId").delete(auth_1.authUser, movie_controller_1.default.deleteMovie);
router.route("/theaterMovies/:theaterId").get(auth_1.authUser, movie_controller_1.default.getMoviesByTheaterId);
exports.default = router;
