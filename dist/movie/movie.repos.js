"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Movie_1 = require("../database/models/Movie");
var movieDB = /** @class */ (function () {
    function movieDB() {
    }
    movieDB.prototype.createMovie = function (movie) {
        var id = movie.id, title = movie.title, genre = movie.genre, duration = movie.duration, rating = movie.rating, posterimg = movie.posterimg, expiryDate = movie.expiryDate, theaterId = movie.theaterId;
        return Movie_1.Movie.create({
            id: id,
            title: title,
            genre: genre,
            duration: duration,
            rating: rating,
            posterimg: posterimg,
            expiryDate: expiryDate,
            theaterId: theaterId
        });
    };
    movieDB.prototype.updateMovie = function (updateData, movieId) {
        return Movie_1.Movie.update(updateData, {
            where: {
                id: movieId
            }
        });
    };
    movieDB.prototype.deleteMovie = function (movieId) {
        return Movie_1.Movie.destroy({
            where: {
                id: movieId
            }
        });
    };
    movieDB.prototype.findAllMovies = function () {
        return Movie_1.Movie.findAll({});
    };
    movieDB.prototype.getMoviesByTitle = function (title) {
        try {
            return Movie_1.Movie.findAll({
                where: {
                    title: title,
                }
            });
        }
        catch (e) {
            return e;
        }
    };
    movieDB.prototype.getMoviesByDuration = function (duration) {
        return Movie_1.Movie.findAll({
            where: {
                duration: duration,
            }
        });
    };
    movieDB.prototype.getMoviesByRating = function (rating) {
        return Movie_1.Movie.findAll({
            where: {
                rating: rating,
            }
        });
    };
    movieDB.prototype.getMoviesByGenre = function (genre) {
        return Movie_1.Movie.findAll({
            where: {
                genre: genre,
            }
        });
    };
    movieDB.prototype.getMoviesByTheater = function (theaterId) {
        return Movie_1.Movie.findAll({
            where: {
                theaterId: theaterId,
            }
        });
    };
    return movieDB;
}());
exports.default = new movieDB;
