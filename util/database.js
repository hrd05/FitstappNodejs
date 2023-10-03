const Sequelize = require('sequelize');

const sequelize =  new Sequelize('node-complete', 'root', 'Harshhrd05!', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;