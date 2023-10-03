const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNuLL: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNuLL: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNuLL: false
    },
    description: {
        type: Sequelize.STRING,
        allowNuLL: false
    }
});

module.exports = Product;

