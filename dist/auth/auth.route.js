"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("./auth.controller"));
var router = express_1.default.Router();
var user = auth_controller_1.default;
router.route("/signup").post(user.signup);
router.route("/signin").post(user.signin);
router.route("/forgot").post(user.forgotPassword);
router.route("/change").post(user.changePassword);
router.route("/reresh").post(user.refreshToken);
router.route("/logout").post(user.logout);
exports.default = router;
