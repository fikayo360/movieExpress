import express, { Express } from 'express'

import authRoute from "./auth/auth.route"
import bookingRoute from "./bookings/bookings.routes"
import movieRoute from "./movie/movie.routes"
import seatRoute from "./seats/seats.routes"
import showTimeRoute from "./showtimes/showtimes.routes"
import theaterRoute from "./theater/theater.routes"

import limiter from "./shared/config/ratelimiting";
require("dotenv").config();

import { Response,Request } from 'express';

const app:Express = express()
const port = process.env.PORT

app.use(limiter)
app.use(express.json());


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/booking',bookingRoute)
app.use('/api/v1/theater',theaterRoute)
app.use('/api/v1/movie',movieRoute)
app.use('/api/v1/showtime',showTimeRoute)
app.use('/api/v1/seat',seatRoute)

app.listen(port,()=>{
   console.log(`app listening on ${port}`);
})    

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
  

