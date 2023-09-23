const http = require('http');

const routes = require('./routes');

// Create an HTTP server
const server = http.createServer(routes);


server.listen(4000)
