"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createSeatSchema = joi_1.default.object({
    theaterId: joi_1.default.string().required(),
    seatnumber: joi_1.default.number().required(),
    showtimeId: joi_1.default.string().required()
});
exports.default = createSeatSchema;
