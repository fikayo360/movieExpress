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
var createMovieSchema_1 = __importDefault(require("./validations/createMovieSchema"));
var http_status_codes_1 = require("http-status-codes");
var errorFormater_1 = __importDefault(require("../shared/services/errorFormater"));
var movie_service_1 = __importDefault(require("./movie.service"));
var uuid_1 = require("uuid");
var tryCatch_1 = __importDefault(require("../shared/services/tryCatch"));
var logger_1 = __importDefault(require("../shared/config/logger"));
var movieController = /** @class */ (function () {
    function movieController() {
        var _this = this;
        this.createMovie = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, validationResult, _a, title, genre, duration, rating, posterimg, expiryDate, theaterId, movie;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        validationResult = createMovieSchema_1.default.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormater_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, title = _a.title, genre = _a.genre, duration = _a.duration, rating = _a.rating, posterimg = _a.posterimg, expiryDate = _a.expiryDate, theaterId = _a.theaterId;
                        movie = { id: id, title: title, genre: genre, duration: duration, rating: rating, posterimg: posterimg, expiryDate: expiryDate, theaterId: theaterId };
                        return [4 /*yield*/, movie_service_1.default.createMovie(movie)];
                    case 1:
                        _b.sent();
                        logger_1.default.info('movie created successfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).json('movie successfully created')];
                }
            });
        }); });
        this.updateMovie = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var movieId, updateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieId = req.params.movieId;
                        updateData = req.body;
                        return [4 /*yield*/, movie_service_1.default.updateMovie(updateData, movieId)];
                    case 1:
                        _a.sent();
                        logger_1.default.info('movie updated successfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'movie successfully updated' })];
                }
            });
        }); });
        this.deleteMovie = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var movieId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieId = req.params.movieId;
                        return [4 /*yield*/, movie_service_1.default.deleteMovie(movieId)];
                    case 1:
                        _a.sent();
                        logger_1.default.info("Movie deleted successfully");
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'movie successfully deleted' })];
                }
            });
        }); });
        this.searchMovie = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = req.query;
                        return [4 /*yield*/, movie_service_1.default.searchMovie(query)];
                    case 1:
                        searchResults = _a.sent();
                        if (!searchResults || searchResults.length === 0)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('movie not found')];
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(searchResults)];
                }
            });
        }); });
        this.getMoviesByTheaterId = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var theaterId, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        theaterId = req.params.theaterId;
                        return [4 /*yield*/, movie_service_1.default.getMoviesByTheaterId(theaterId)];
                    case 1:
                        searchResults = _a.sent();
                        if (!searchResults || searchResults.length === 0)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('movie not found')];
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(searchResults)];
                }
            });
        }); });
    }
    return movieController;
}());
exports.default = new movieController;
