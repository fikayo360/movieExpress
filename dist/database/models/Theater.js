"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = require('../postgresConfig');
var Theater = sequelizee.define('Theater', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    },
    seatingCapacity: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
Theater.sync({ force: true }).then(function () {
    console.log("theater Model synced");
});
module.exports = Theater;
