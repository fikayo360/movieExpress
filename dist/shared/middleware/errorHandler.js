"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appError = require('../services/appError');
var errorFormat = require('../services/errorFormater');
var ErrorHandler = function (err, req, res, next) {
    if (err instanceof appError) {
        console.log(err.message);
        return res.status(err.statusCode).json(errorFormat(err.message, err.statusCode));
    }
    console.log('something went wrong');
    return res.status(500).send("Something went wrong");
};
module.exports = ErrorHandler;
