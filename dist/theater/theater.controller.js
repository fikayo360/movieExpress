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
var createTheaterSchema_1 = __importDefault(require("./validations/joi/createTheaterSchema"));
var uuid_1 = require("uuid");
var http_status_codes_1 = require("http-status-codes");
var logger_1 = __importDefault(require("../shared/config/logger"));
var theater_service_1 = __importDefault(require("./theater.service"));
var theaterController = /** @class */ (function () {
    function theaterController() {
        var _this = this;
        this.createTheater = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, validationResult, _a, name, location, seatingCapacity, theater;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        validationResult = createTheaterSchema_1.default.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, name = _a.name, location = _a.location, seatingCapacity = _a.seatingCapacity;
                        theater = { id: id, name: name, location: location, seatingCapacity: seatingCapacity };
                        return [4 /*yield*/, theater_service_1.default.createTheater(theater)];
                    case 1:
                        _b.sent();
                        logger_1.default.info('theater created succesfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'theater created successfully' })];
                }
            });
        }); });
        this.getTheater = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, theater;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, theater_service_1.default.getTheater(id)];
                    case 1:
                        theater = _a.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(theater)];
                }
            });
        }); });
        this.getAllTheater = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var theaters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, theater_service_1.default.getAllTheaters()];
                    case 1:
                        theaters = _a.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(theaters)];
                }
            });
        }); });
        this.deleteTheater = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, theater_service_1.default.deleteTheater(id)];
                    case 1:
                        _a.sent();
                        logger_1.default.info('theater deleted successfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'theater deleted successfully' })];
                }
            });
        }); });
    }
    return theaterController;
}());
exports.default = new theaterController;
