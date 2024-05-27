const express = require('express');
const dotenv = require('dotenv')
import limiter from "./shared/config/ratelimiting";
import cluster from 'cluster'
import os from 'os'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(limiter)

const numCPUs = os.cpus().length;
if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
  
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker process ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    const app = express();
    app.listen(port,()=>{
        console.log(`app listening on ${port}`);
    })    
  }
  

