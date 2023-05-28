// server setup

const http = require("http");

// create the server, to listen
/**
 * create server taked in a callback
 * this call back has two ars incoming req and outgoin response
 * listen taskes in arg for hot , portnumber
 */
const server = http.createServer((req, res) => {
  console.log(req);
});

// listen for the server

server.listen(3000);
