"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../postgresConfig"));
exports.User = postgresConfig_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING
    },
    resettoken: {
        type: sequelize_1.DataTypes.STRING
    },
    hashedRt: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.User.sync().then(function () {
    console.log("User Model synced");
});
