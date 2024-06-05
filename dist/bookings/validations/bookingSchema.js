"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createBookingSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    totalPrice: joi_1.default.number().required(),
    seatnumber: joi_1.default.number().required(),
    showtimeId: joi_1.default.string().required()
});
exports.default = createBookingSchema;
