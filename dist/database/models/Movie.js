"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
var Theater_1 = require("./Theater");
exports.Movie = postgresConfig_1.default.define('Movie', {
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
        type: sequelize_1.DataTypes.INTEGER
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
            model: Theater_1.Theater,
        }
    }
});
exports.Movie.sync().then(function () {
    console.log("Movie Model synced");
});
exports.default = exports.Movie;
