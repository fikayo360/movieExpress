"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Showtime = void 0;
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
var Theater_1 = require("./Theater");
var Movie_1 = __importDefault(require("./Movie"));
exports.Showtime = postgresConfig_1.default.define('Showtimes', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    startTime: {
        type: sequelize_1.DataTypes.TIME
    },
    endTime: {
        type: sequelize_1.DataTypes.TIME
    },
    theaterId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Theater_1.Theater,
        },
    },
    movieId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Movie_1.default,
        }
    }
});
exports.Showtime.sync().then(function () {
    console.log("Showtimes Model synced");
});
exports.default = exports.Showtime;
