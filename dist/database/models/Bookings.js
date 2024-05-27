"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = require('../postgresConfig');
var User = require('../models/User');
var Showtimes = require('../models/Showtimes');
var Bookings = sequelizee.define('Bookings', {
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
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User,
        }
    },
    showtimeId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Showtimes,
        }
    }
});
Bookings.sync({ force: true }).then(function () {
    console.log("Bookings Model synced");
});
module.exports = Bookings;
