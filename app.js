const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




// app.use((req, res, next) => {
//     User.findUserById('65958e027b9ca630455ca2ab')
//         .then(user => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch(err => console.log(err));
//     // next();
// })



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harshdunkhwal55:hbCkEDLtWHpEFNiB@cluster0.al3derw.mongodb.net/shop?retryWrites=true&w=majority')
    .then((result) => {
        app.listen(3000);
        console.log('connected');
    })
    .catch(err => console.log(err));

