"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createShowtimeSchema = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    theaterId: joi_1.default.string().required(),
    startTime: joi_1.default.string().required(),
    endTime: joi_1.default.string().required(),
});
exports.default = createShowtimeSchema;
