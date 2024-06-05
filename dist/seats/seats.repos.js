"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Seat_1 = require("../database/models/Seat");
var seatDB = /** @class */ (function () {
    function seatDB() {
    }
    seatDB.prototype.createShowtimesSeat = function (seat) {
        var id = seat.id, theaterId = seat.theaterId, seatnumber = seat.seatnumber, showtimeId = seat.showtimeId;
        return Seat_1.Seat.create({
            id: id,
            theaterId: theaterId,
            seatnumber: seatnumber,
            showtimeId: showtimeId
        });
    };
    seatDB.prototype.getShowtimesSeat = function (showtimeId) {
        return Seat_1.Seat.findOne({
            where: {
                showtimeId: showtimeId
            }
        });
    };
    seatDB.prototype.fetchAvailableSeats = function (showtimeId) {
        return Seat_1.Seat.findAll({
            where: {
                showtimeId: showtimeId,
                availability: true
            }
        });
    };
    seatDB.prototype.fetchUnAvailableSeats = function (showtimeId) {
        return Seat_1.Seat.findAll({
            where: {
                showtimeId: showtimeId,
                availability: false
            }
        });
    };
    seatDB.prototype.chooseSeat = function (showtimeId, seatnumber) {
        return Seat_1.Seat.update({
            availability: false
        }, {
            where: {
                showtimeId: showtimeId,
                seatnumber: seatnumber
            }
        });
    };
    return seatDB;
}());
exports.default = new seatDB;
