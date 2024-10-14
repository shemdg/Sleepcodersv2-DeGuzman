const Sequelize = require('sequelize');
const connection = require('../database/connection'); // Adjust the path to your actual database connection

const OTP = connection.define('otp', {
    valid_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'otp',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: [ 'valid_code']
      }
    ]
  });


  
module.exports = OTP;