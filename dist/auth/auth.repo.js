"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../database/models/User");
var authDb = /** @class */ (function () {
    function authDb() {
    }
    authDb.prototype.findUsername = function (username) {
        return User_1.User.findOne({ where: { username: username } });
    };
    authDb.prototype.findEmail = function (email) {
        return User_1.User.findOne({ where: { email: email } });
    };
    authDb.prototype.createUser = function (payload) {
        var id = payload.id, username = payload.username, email = payload.email, password = payload.password, role = payload.role;
        return User_1.User.create({
            id: id,
            username: username,
            email: email,
            password: password,
            role: role
        });
    };
    authDb.prototype.updateResetToken = function (reset, userId) {
        return User_1.User.update({
            resettoken: reset
        }, {
            where: {
                id: userId
            }
        });
    };
    authDb.prototype.changePassword = function (newPassword, id) {
        return User_1.User.update({
            resettoken: null,
            password: newPassword
        }, {
            where: {
                id: id
            }
        });
    };
    authDb.prototype.findId = function (userId) {
        return User_1.User.findOne({ where: { id: userId } });
    };
    authDb.prototype.updateRefreshTokenHash = function (id, hash) {
        return User_1.User.update({
            hashedRt: hash
        }, {
            where: {
                id: id
            }
        });
    };
    authDb.prototype.updateRefreshTokenToNull = function (userId) {
        return User_1.User.update({
            hashedRt: null
        }, {
            where: {
                id: userId
            }
        });
    };
    return authDb;
}());
exports.default = new authDb();
