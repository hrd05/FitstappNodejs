const mongodb = require('mongodb');
const getdb = require('../util/database').getdb;

class User {
    constructor(username, email, cart, id) {
        this.username = username
        this.email = email
        this.cart = cart
        this._id = id
    }

    save() {
        const db = getdb();
        return db.collection('users').insertOne(this)
    }

    addToCart(product) {

        const updateProductIndex = this.cart.items.findIndex((cartProduct) => { return cartProduct.productId.toString() === product._id.toString() })

        let newQuantity = 1;
        const CartItems = [...this.cart.items];

        if (updateProductIndex >= 0) {
            newQuantity = this.cart.items[updateProductIndex].quantity + 1;
            CartItems[updateProductIndex].quantity = newQuantity;
        }
        else {
            CartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
        }
        const updatedCart = { items: CartItems };

        const db = getdb();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })
    }

    static findUserById(userId) {
        const db = getdb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
            .then((user) => {
                return user;
            })
            .catch(err => console.log(err));

    }
}

module.exports = User;