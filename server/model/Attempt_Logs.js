const { DataTypes } = require('sequelize');
const connection = require('../database/connection'); // Adjust the path to your actual database connection

const Attempt_Logs = connection.define('attempt_logs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  browser_info: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attempt_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time_restriction: {
    type: DataTypes.DATE,
    allowNull: true, // Can be null if no restriction applied yet
  },
  locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'attempt_logs',
  timestamps: true, // Enable automatic createdAt and updatedAt fields
});

module.exports = Attempt_Logs;
