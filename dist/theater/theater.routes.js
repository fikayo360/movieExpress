"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var theater_controller_1 = __importDefault(require("./theater.controller"));
var auth_1 = require("../shared/middleware/auth");
var router = express_1.default.Router();
router.route("/create").post(auth_1.authUser, theater_controller_1.default.createTheater);
router.route("/get/:id").get(auth_1.authUser, theater_controller_1.default.getTheater);
router.route("/all").get(auth_1.authUser, theater_controller_1.default.getAllTheater);
router.route("/delete/:id").delete(auth_1.authUser, theater_controller_1.default.deleteTheater);
exports.default = router;
