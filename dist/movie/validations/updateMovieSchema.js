"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var updateMovieSchema = joi_1.default.object({
    title: joi_1.default.string(),
    genre: joi_1.default.string(),
    duration: joi_1.default.number(),
    rating: joi_1.default.number(),
    posterimg: joi_1.default.string(),
    expiryDate: joi_1.default.date(),
    theaterId: joi_1.default.string()
});
exports.default = updateMovieSchema;
