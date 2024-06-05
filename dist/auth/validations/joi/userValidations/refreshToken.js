"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var refreshToken = joi_1.default.object({
    userId: joi_1.default.string().required(),
    rt: joi_1.default.string().required(),
});
exports.default = refreshToken;
