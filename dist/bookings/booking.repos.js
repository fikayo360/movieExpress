"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Booking_1 = __importDefault(require("../database/models/Booking"));
var bookingDb = /** @class */ (function () {
    function bookingDb() {
    }
    bookingDb.prototype.createBooking = function (dto) {
        var id = dto.id, userId = dto.userId, showtimeId = dto.showtimeId, seatnumber = dto.seatnumber, totalPrice = dto.totalPrice;
        console.log({ id: id, userId: userId, showtimeId: showtimeId, seatnumber: seatnumber, totalPrice: totalPrice });
        return Booking_1.default.create({
            id: id,
            userId: userId,
            showtimeId: showtimeId,
            seatnumber: seatnumber,
            totalPrice: totalPrice
        });
    };
    bookingDb.prototype.findBookingById = function (bookingId) {
        return Booking_1.default.findAll({
            where: {
                id: bookingId,
            }
        });
    };
    return bookingDb;
}());
exports.default = new bookingDb;
