"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Showtime_1 = __importDefault(require("../database/models/Showtime"));
var showtimeDb = /** @class */ (function () {
    function showtimeDb() {
    }
    showtimeDb.prototype.createShowtime = function (dto) {
        var id = dto.id, movieId = dto.movieId, theaterId = dto.theaterId, startTime = dto.startTime, endTime = dto.endTime;
        console.log({ id: id, movieId: movieId, theaterId: theaterId, startTime: startTime, endTime: endTime });
        return Showtime_1.default.create({
            id: id,
            movieId: movieId,
            theaterId: theaterId,
            startTime: startTime,
            endTime: endTime
        });
    };
    showtimeDb.prototype.deleteShowtimes = function (id) {
        return Showtime_1.default.destroy({
            where: {
                id: id
            }
        });
    };
    showtimeDb.prototype.getShowtimes = function (movieId) {
        return Showtime_1.default.findAll({
            where: {
                movieId: movieId
            }
        });
    };
    return showtimeDb;
}());
exports.default = new showtimeDb;
