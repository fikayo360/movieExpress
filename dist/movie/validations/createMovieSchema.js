"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createMovieSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    genre: joi_1.default.string().required(),
    duration: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
    posterimg: joi_1.default.string().required(),
    expiryDate: joi_1.default.date().required(),
    theaterId: joi_1.default.string().required()
});
exports.default = createMovieSchema;
