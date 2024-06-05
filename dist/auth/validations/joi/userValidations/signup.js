"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var signupSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(4).required(),
});
exports.default = signupSchema;
