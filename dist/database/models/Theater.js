"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theater = void 0;
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
exports.Theater = postgresConfig_1.default.define('Theater', {
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
exports.Theater.sync().then(function () {
    console.log("theater Model synced");
});
