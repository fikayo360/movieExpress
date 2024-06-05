"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = new sequelize_1.Sequelize('postgres://fikayo:kVSGAs4N8YKdDSAzMrroumsaQi7ZHeYz@dpg-cp1k1muct0pc73d2boag-a.oregon-postgres.render.com/movie_vq50', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
    logging: console.log,
});
sequelizee
    .authenticate()
    .then(function () {
    console.log('Connection successful!');
})
    .catch(function (error) {
    console.log('Connection failed:', error);
});
exports.default = sequelizee;
