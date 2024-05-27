"use strict";
var appError = require('../services/appError');
var errorFormat = /** @class */ (function () {
    function errorFormat() {
    }
    errorFormat.prototype.format = function (message, statusCode) {
        var error = new appError(message, statusCode);
        return {
            statusCode: error.statusCode,
            message: error.message
        };
    };
    return errorFormat;
}());
module.exports = new errorFormat();
