const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, },
            quantity: { type: Number, required: true }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    let updateProductIndex = -1;
    if (this.cart.items !== null) {
        updateProductIndex = this.cart.items.findIndex((cartProduct) => { return cartProduct.productId.toString() === product._id.toString() })
    }


    let newQuantity = 1;
    const CartItems = this.cart.items ? [...this.cart.items] : [];

    if (updateProductIndex >= 0) {
        newQuantity = this.cart.items[updateProductIndex].quantity + 1;
        CartItems[updateProductIndex].quantity = newQuantity;
    }
    else {
        CartItems.push({ productId: product._id, quantity: newQuantity })
    }
    const updatedCart = { items: CartItems };

    this.cart = updatedCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getdb = require('../util/database').getdb;

// class User {
//     constructor(username, email, cart, id) {
//         this.username = username
//         this.email = email
//         this.cart = cart
//         this._id = id
//     }

//     save() {
//         const db = getdb();
//         return db.collection('users').insertOne(this)
//     }

//     addToCart(product) {
//         let updateProductIndex = -1;
//         if (this.cart.items !== null) {
//             updateProductIndex = this.cart.items.findIndex((cartProduct) => { return cartProduct.productId.toString() === product._id.toString() })
//         }


//         let newQuantity = 1;
//         const CartItems = this.cart.items ? [...this.cart.items] : [];

//         if (updateProductIndex >= 0) {
//             newQuantity = this.cart.items[updateProductIndex].quantity + 1;
//             CartItems[updateProductIndex].quantity = newQuantity;
//         }
//         else {
//             CartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
//         }
//         const updatedCart = { items: CartItems };

//         const db = getdb();
//         return db.collection('users')
//             .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })
//     }

//     static findUserById(userId) {
//         const db = getdb();
//         return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
//             .then((user) => {
//                 return user;
//             })
//             .catch(err => console.log(err));

//     }

//     getCart() {
//         const db = getdb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 })
//             })
//     }

//     deleteCartProduct(prodId) {
//         const cartItems = this.cart.items.filter(p => {
//             return p.productId.toString() !== prodId;
//         })
//         const db = getdb();
//         return db.collection('users')
//             .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: cartItems } } })
//     }


//     addOrder() {
//         const db = getdb();
//         return this.getCart().then((products) => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.username
//                 }
//             }
//             return db.collection('orders').insertOne(order)

//         })
//             .then((result) => {
//                 this.cart = { items: [] };
//                 return db.collection('users')
//                     .updateOne({ _id: new mongodb.ObjectId(this._id) },
//                         { $set: { cart: { items: [] } } })
//             })
//     }

//     getOrder() {
//         const db = getdb();
//         return db.collection('orders').find().toArray()

//     }
// }

// module.exports = User;