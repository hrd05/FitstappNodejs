const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.use((req, res, next) => {
    User.findById('659802eceaa7dd46979c1697')
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => console.log(err));

})



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harshdunkhwal55:hbCkEDLtWHpEFNiB@cluster0.al3derw.mongodb.net/shop?retryWrites=true&w=majority')
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: 'Harsh',
                    email: 'harshdunkhwal55@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save();
            }
        })


        app.listen(3000);
        console.log('connected');
    })
    .catch(err => console.log(err));

