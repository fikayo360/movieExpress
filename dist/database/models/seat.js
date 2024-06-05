"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seat = void 0;
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
var Showtime_1 = __importDefault(require("./Showtime"));
var Theater_1 = require("./Theater");
exports.Seat = postgresConfig_1.default.define('Seats', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    theaterId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Theater_1.Theater
        }
    },
    seatnumber: {
        type: sequelize_1.DataTypes.INTEGER
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    showtimeId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Showtime_1.default,
        }
    }
});
exports.Seat.sync().then(function () {
    console.log("Seats Model synced");
});
exports.default = exports.Seat;
