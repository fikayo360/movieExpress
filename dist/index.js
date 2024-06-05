"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth/auth.route"));
var bookings_routes_1 = __importDefault(require("./bookings/bookings.routes"));
var movie_routes_1 = __importDefault(require("./movie/movie.routes"));
var seats_routes_1 = __importDefault(require("./seats/seats.routes"));
var showtimes_routes_1 = __importDefault(require("./showtimes/showtimes.routes"));
var theater_routes_1 = __importDefault(require("./theater/theater.routes"));
var ratelimiting_1 = __importDefault(require("./shared/config/ratelimiting"));
require("dotenv").config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(ratelimiting_1.default);
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/booking', bookings_routes_1.default);
app.use('/api/v1/theater', theater_routes_1.default);
app.use('/api/v1/movie', movie_routes_1.default);
app.use('/api/v1/showtime', showtimes_routes_1.default);
app.use('/api/v1/seat', seats_routes_1.default);
app.listen(port, function () {
    console.log("app listening on ".concat(port));
});
// app.use('api/v1/booking',bookingRoute)
// app.use('api/v1/movie',movieRoute)
// app.use('api/v1/seat',seatRoute)
// app.use('api/v1/showtimes',showTimeRoute)
// app.use('api/v1/theater',theaterRoute)
// const numCPUs = os.cpus().length;
// if (cluster.isMaster) {
//     console.log(`Master process ${process.pid} is running`);
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//       cluster.fork();
//     });
//   } else {
//     app.listen(port,()=>{
//         console.log(`app listening on ${port}`);
//     })    
//   }
