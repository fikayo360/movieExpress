"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        }),
        new winston_1.transports.File({
            level: 'info',
            filename: 'serverLogs.log',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        })
    ]
});
exports.default = logger;
