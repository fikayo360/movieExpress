"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appError = require('../services/appError');
var errorFormatter = function (message, statusCode) {
    var error = new appError(message, statusCode);
    return {
        statusCode: error.statusCode,
        message: error.message
    };
};
exports.default = errorFormatter;
