"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = require('../postgresConfig');
var Theater = require('../models/Theater');
var Movie = require('../models/Movie');
var Showtimes = sequelizee.define('Showtimes', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE
    },
    theaterId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Theater,
        },
    },
    movieId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Movie,
        }
    }
});
Showtimes.sync({ force: true }).then(function () {
    console.log("Showtimes Model synced");
});
module.exports = Showtimes;
