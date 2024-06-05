"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appError = require('../services/appError');
var logger_1 = __importDefault(require("../config/logger"));
var errorFormat = require('../services/errorFormater');
var ErrorHandler = function (err, req, res, next) {
    if (err instanceof appError) {
        logger_1.default.error(err.message);
        return res.status(err.statusCode).json(errorFormat(err.message, err.statusCode));
    }
    logger_1.default.error('something went wrong');
    return res.status(500).send("Something went wrong");
};
exports.default = ErrorHandler;
