const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNuLL: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNuLL: false
    },
    email: {
        type: Sequelize.STRING,
        allowNuLL: false
    }
});

module.exports = User;