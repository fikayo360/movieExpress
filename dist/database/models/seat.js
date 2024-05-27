"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = require('../postgresConfig');
var Showtimes = require('../models/Showtimes');
var Seats = sequelizee.define('Seats', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    theaterId: {
        type: sequelize_1.DataTypes.UUID
    },
    seatnumber: {
        type: sequelize_1.DataTypes.INTEGER
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    showtimeId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Showtimes,
        }
    }
});
Seats.sync({ force: true }).then(function () {
    console.log("Seats Model synced");
});
module.exports = Seats;
