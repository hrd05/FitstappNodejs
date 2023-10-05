const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNuLL: false,
    primaryKey: true
   },
   quantity: {
    type: Sequelize.INTEGER
   }
});

module.exports = CartItem;