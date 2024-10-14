const Sequelize = require('sequelize');
const connection = require('../database/connection');

const UserModel = connection.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each user'
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Username for user authentication'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Password for user authentication'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Ensures that email addresses are unique
    validate: {
      isEmail: true, // Validates that the string is a valid email format
    },
    comment: 'Email address for user communication'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false, // Set to true if you want to allow null values
    comment: 'Full name of the user'
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Current status of the user (e.g., active, inactive)'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  }
});



module.exports = UserModel;
