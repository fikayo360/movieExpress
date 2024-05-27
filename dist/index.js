"use strict";
var express = require('express');
var dotenv = require('dotenv');
var ErrorHandler = require('./shared/middleware/errorHandler');
dotenv.config();
var app = express();
var seq = require('../src/database/postgresConfig');
var port = process.env.PORT;
app.use(ErrorHandler);
// seq
//   .authenticate()
//   .then(() => {
//     console.log('Connection successful!')
//   })
//   .catch((error:any) => {
//     console.log('Connection failed:', error)
//   })
app.listen(port, function () {
    console.log("app listening on ".concat(port));
});
