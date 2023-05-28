// server setup

const http = require("http");
const requestHandler = require("./routes");

// create the server, to listen
/**
 * create server taked in a callback
 * this call back has two ars incoming req and outgoin response
 * listen taskes in arg for hot , portnumber
 *
 * to end the event loop on server,
 *  ==> process.exit()
 * after ending res via end, res should nnot be altered
 */
const server = http.createServer(requestHandler);

// listen for the server

server.listen(3000);
