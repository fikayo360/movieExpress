"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tryCatch_1 = __importDefault(require("../shared/services/tryCatch"));
var http_status_codes_1 = require("http-status-codes");
var uuid_1 = require("uuid");
var bookingSchema_1 = __importDefault(require("./validations/bookingSchema"));
var booking_service_1 = __importDefault(require("./booking.service"));
var logger_1 = __importDefault(require("../shared/config/logger"));
var bookingsController = /** @class */ (function () {
    function bookingsController() {
        var _this = this;
        this.createBooking = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, validationResult, _a, userId, showtimeId, seatnumber, totalPrice, dto;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        validationResult = bookingSchema_1.default.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, userId = _a.userId, showtimeId = _a.showtimeId, seatnumber = _a.seatnumber, totalPrice = _a.totalPrice;
                        dto = { id: id, userId: userId, showtimeId: showtimeId, seatnumber: seatnumber, totalPrice: totalPrice };
                        return [4 /*yield*/, booking_service_1.default.createBooking(dto)];
                    case 1:
                        _b.sent();
                        logger_1.default.info('booking created succesfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'booking created successfully' })];
                }
            });
        }); });
        this.verifyBookingId = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookingId, verified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookingId = req.params.bookingId;
                        return [4 /*yield*/, booking_service_1.default.verifyBooking(bookingId)];
                    case 1:
                        verified = _a.sent();
                        if (!verified)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error occured while verifing your booking')];
                        logger_1.default.info('booking verified successfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'booking verified successfully' })];
                }
            });
        }); });
    }
    return bookingsController;
}());
exports.default = new bookingsController;
