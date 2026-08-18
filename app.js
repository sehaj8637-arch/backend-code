//Import the HTTp module
const http = require('http');

// Create a  server
const server = http.createServer((req, res) => {
    res.write("Hello ,Students!");
    res.end();
});

// Connect the server to a port
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});