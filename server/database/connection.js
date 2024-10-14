const { Sequelize } = require("sequelize");

require("dotenv").config();

const connections = new Sequelize(process.env.DATABASE_NAME, "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: "process.env.PORT", // Specify the port number here
});

module.exports = connections;
