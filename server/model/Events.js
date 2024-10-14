const Sequelize = require("sequelize");
const connection = require("../database/connection");

const EventModel = connection.define(
  "events",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true, // This field is optional
    },
    imghref: {
      type: Sequelize.STRING(255),
      allowNull: true, // This field is optional
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING(100),
      allowNull: true, // This field is optional
    },
    member: {
      type: Sequelize.STRING(255),
      allowNull: true, // This field is optional
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: true, // This field is optional
    },
  },
  {
    tableName: "events", // Specifies the table name
    timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
  }
);

module.exports = EventModel;
