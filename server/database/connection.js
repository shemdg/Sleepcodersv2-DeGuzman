<<<<<<< HEAD
const {Sequelize} = require('sequelize');

require("dotenv").config();

const connections = new Sequelize(process.env.DATABASE_NAME, 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.PORT// Specify the port number here
});
  
module.exports = connections;
  
=======
const { Sequelize } = require("sequelize");

require("dotenv").config();

const connections = new Sequelize(process.env.DATABASE_NAME, "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: "process.env.PORT", // Specify the port number here
});

module.exports = connections;
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
