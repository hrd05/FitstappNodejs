const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {

    // console.log(req.url)
    const url = req.url;
    res.setHeader('Content-Type','text/html');
    let message = '';
    if(url === '/home'){
        message = 'Welcome Home';
    }
    if(url === '/about'){
        message = 'Welcome to About Us page';
    }
    if(url === '/node'){
        message = 'Welcome to Node js Project';
    }

    res.write(`<html><body><h1>${message}</h1></body></html>`);
    res.end();
    

});


server.listen(4000)
