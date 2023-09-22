const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// Define the port to listen on
const port = 4000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log('Server is running on port ' + port);
  console.log('My name is harsh tanwar.');
});
