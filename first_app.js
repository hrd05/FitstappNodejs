

const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('In the middleware');
    next();
});

app.use((req,res,next)=>{
    console.log('In the next Middleware');
    res.send('<h1>Welcome to the Express JS</h1>')
});

// Create an HTTP server
app.listen(3000);
