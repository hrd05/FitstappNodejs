const mongodb = require('mongodb');
const getdb = require('../util/database').getdb;


class Product {
    constructor(title, price, imageUrl, description, id) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this._id = new mongodb.ObjectId(id)
    }

    save() {
        const db = getdb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }



    static fetchAll() {
        const db = getdb();
        return db.collection('products').find().toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => console.log(err))
    }

    static findById(prodID) {
        const db = getdb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodID) })
            .next()
            .then(product => {
                // console.log(product);
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(prodId) {
        const db = getdb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(() => {
                console.log('deleted');
            })
            .catch(err => console.log(err));

    }
}


module.exports = Product;

