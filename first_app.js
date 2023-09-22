const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {

    res.write('Harsh Tanwar')
    res.end()
});


server.listen(4000)
