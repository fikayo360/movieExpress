"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
var User_1 = require("./User");
var Showtime_1 = require("./Showtime");
var Booking = postgresConfig_1.default.define('Bookings', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    seatnumber: {
        type: sequelize_1.DataTypes.INTEGER
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
        }
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER
    },
    showtimeId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Showtime_1.Showtime,
        }
    }
});
Booking.sync().then(function () {
    console.log("Bookings Model synced");
});
exports.default = Booking;
