"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Theater_1 = require("../database/models/Theater");
var theaterDB = /** @class */ (function () {
    function theaterDB() {
    }
    theaterDB.prototype.createTheater = function (theater) {
        var id = theater.id, name = theater.name, location = theater.location, seatingCapacity = theater.seatingCapacity;
        return Theater_1.Theater.create({
            id: id,
            name: name,
            location: location,
            seatingCapacity: seatingCapacity
        });
    };
    theaterDB.prototype.getAllTheaters = function () {
        return Theater_1.Theater.findAll({});
    };
    theaterDB.prototype.getSingleTheater = function (id) {
        return Theater_1.Theater.findOne({
            where: {
                id: id,
            }
        });
    };
    theaterDB.prototype.deleteTheater = function (id) {
        return Theater_1.Theater.destroy({
            where: {
                id: id,
            }
        });
    };
    return theaterDB;
}());
exports.default = new theaterDB;
