"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createTheaterSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    seatingCapacity: joi_1.default.number().required(),
});
exports.default = createTheaterSchema;
