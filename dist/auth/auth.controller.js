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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_services_1 = __importDefault(require("./auth.services"));
var tryCatch_1 = __importDefault(require("../shared/services/tryCatch"));
var http_status_codes_1 = require("http-status-codes");
var userValidations_1 = require("./validations/joi/userValidations");
var uuid_1 = require("uuid");
var sendEmail_1 = require("../shared/services/sendEmail");
var logger_1 = __importDefault(require("../shared/config/logger"));
var auth = auth_services_1.default;
var authController = /** @class */ (function () {
    function authController() {
        var _this = this;
        this.signup = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, validationResult, _a, email, username, password, isExisting, hashPassword, role, user, tokens, accesstoken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (0, uuid_1.v4)();
                        console.log(req.body);
                        validationResult = userValidations_1.signupSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, email = _a.email, username = _a.username, password = _a.password;
                        isExisting = auth.userExists(email, username);
                        return [4 /*yield*/, isExisting];
                    case 1:
                        if (_b.sent()) {
                            logger_1.default.error('User already exists');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('user already exists')];
                        }
                        hashPassword = auth.hashPassword(password, 10);
                        role = 'user';
                        user = { id: userId, email: email, username: username, password: hashPassword, role: role };
                        return [4 /*yield*/, auth.createUser(user, res)];
                    case 2:
                        tokens = _b.sent();
                        accesstoken = tokens.access_token;
                        logger_1.default.info('User created successfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user created successfully', accesstoken: accesstoken })];
                }
            });
        }); });
        this.signin = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, username, password, findUser, foundUser, currentPassword, foundUserPassword, others, id, email, userId, emailAddress, tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = userValidations_1.loginSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, username = _a.username, password = _a.password;
                        return [4 /*yield*/, auth.findUsername(username)];
                    case 1:
                        findUser = _b.sent();
                        foundUser = findUser.dataValues;
                        if (!findUser) {
                            logger_1.default.error('user does not exist');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json("that user does not exist")];
                        }
                        currentPassword = foundUser.password;
                        if (!auth.comparePasswords(password, currentPassword)) {
                            logger_1.default.error('wrong password');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong password')];
                        }
                        foundUserPassword = foundUser.password, others = __rest(foundUser, ["password"]);
                        id = others.id, email = others.email;
                        console.log(id, email);
                        userId = id;
                        emailAddress = email;
                        tokens = auth.getTokens(userId, emailAddress, res);
                        return [4 /*yield*/, auth.updatedRefreshTokenHash(userId, tokens.refresh_token)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(tokens)];
                }
            });
        }); });
        this.forgotPassword = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, email, findUser, foundUser, userId, reset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationResult = userValidations_1.forgotPasswordSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json(validationResult.error.details[0])];
                        }
                        email = validationResult.value.email;
                        return [4 /*yield*/, auth.findEmail(email)];
                    case 1:
                        findUser = _a.sent();
                        foundUser = findUser.dataValues;
                        if (!foundUser) {
                            logger_1.default.error('that user does not exist');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('that user does not exist')];
                        }
                        userId = foundUser.id;
                        reset = (0, sendEmail_1.sendResetToken)(email);
                        console.log(reset);
                        return [4 /*yield*/, auth.updateToken(reset, userId)];
                    case 2:
                        _a.sent();
                        logger_1.default.info('reset token sent succesfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Reset token sent successfully' })];
                }
            });
        }); });
        this.changePassword = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, token, email, newPassword, findUser, foundUser, userId, newHashed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = userValidations_1.changePasswordSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, token = _a.token, email = _a.email, newPassword = _a.newPassword;
                        return [4 /*yield*/, auth.findEmail(email)];
                    case 1:
                        findUser = _b.sent();
                        foundUser = findUser.dataValues;
                        userId = foundUser.id;
                        if (!(foundUser.resettoken === token)) return [3 /*break*/, 3];
                        newHashed = auth.hashPassword(newPassword, 10);
                        return [4 /*yield*/, auth.changePassword(newHashed, userId)];
                    case 2:
                        _b.sent();
                        logger_1.default.info('password updated succesfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('password updated successfully')];
                    case 3:
                        logger_1.default.error('wrong user');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong user')];
                }
            });
        }); });
        this.refreshToken = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, userId, rt, findUser, foundUser, hashedRt, email, compareRt, getTokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = userValidations_1.refreshToken.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(validationResult.error.details[0].message)];
                        }
                        _a = validationResult.value, userId = _a.userId, rt = _a.rt;
                        return [4 /*yield*/, auth.findId(userId)];
                    case 1:
                        findUser = _b.sent();
                        foundUser = findUser === null || findUser === void 0 ? void 0 : findUser.dataValues;
                        if (!foundUser || !foundUser.hashedRt) {
                            logger_1.default.error('user not found');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('user not found')];
                        }
                        hashedRt = foundUser.hashedRt;
                        email = foundUser.email;
                        compareRt = auth.compareRt(rt, hashedRt);
                        if (!compareRt) {
                            logger_1.default.error('the refresh token is not valid');
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('the refresh token is not valid')];
                        }
                        getTokens = auth.getTokens(userId, email, res);
                        return [4 /*yield*/, auth.updatedRefreshTokenHash(userId, rt)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(getTokens)];
                }
            });
        }); });
        this.logout = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        return [4 /*yield*/, auth.updateRtToNull(userId)];
                    case 1:
                        _a.sent();
                        logger_1.default.info('logged out succesfully');
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('logged out succesfully')];
                }
            });
        }); });
    }
    return authController;
}());
exports.default = new authController();
