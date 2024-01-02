const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const url = 'mongodb+srv://harshdunkhwal55:hbCkEDLtWHpEFNiB@cluster0.al3derw.mongodb.net/shop?retryWrites=true&w=majority'

let db;

const mongoConnect = (callback) => {
    MongoClient.connect(url)

        .then((client) => {
            console.log('connected');
            db = client.db();
            callback();
        })
        .catch(err => console.log(err));
};

const getdb = () => {
    if (db) {
        return db;
    }
    throw 'No database found';
}

module.exports = { mongoConnect, getdb };