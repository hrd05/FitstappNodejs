const mongodb = require('mongodb');
const getdb = require('../util/database').getdb;

class User {
    constructor(username, email) {
        this.username = username
        this.email = email
    }

    save() {
        const db = getdb();
        return db.collection('users').insertOne(this)
    }

    static findUserById(userId) {
        const db = getdb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })

    }
}

module.exports = User;