"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = require('../postgresConfig');
var Theater = require('../models/Theater');
var Movie = sequelizee.define('Movie', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    genre: {
        type: sequelize_1.DataTypes.STRING
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT
    },
    posterimg: {
        type: sequelize_1.DataTypes.STRING
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE
    },
    theaterId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Theater,
        }
    }
});
Movie.sync({ force: true }).then(function () {
    console.log("Movie Model synced");
});
module.exports = Movie;
