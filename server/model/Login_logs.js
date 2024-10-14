const { DataTypes } = require('sequelize');
const connection = require('../database/connection'); // Adjust the path to your actual database connection

const Login_Logs = connection.define('login_logs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    session_id: {
        type: DataTypes.STRING, // Adjust type based on your session ID format
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER, // Assuming user_id is an integer, adjust if necessary
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    browser_info: {
        type: DataTypes.STRING,
        allowNull: true // Adjust if you want to make it required
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Default to false if not provided
    }
}, {
    // Options
    timestamps: true, // Enables createdAt and updatedAt fields
    createdAt: 'createdAt', // Customize the name of the createdAt field if needed
    updatedAt: 'updatedAt'  // Customize the name of the updatedAt field if needed
});

module.exports = Login_Logs;
