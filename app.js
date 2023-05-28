// server setup

const http = require("http");
const fs = require("fs");

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
const server = http.createServer((req, res) => {
  console.log(req);

  const messageHTML =
    "<html> <head><title>Node Test</title></head> <body>Hello from Node server</body> </html>";
  res.setHeader("Content-Type", "text-html");

  const inputHTML =
    " <html> <form action = '/message' method = 'POST'><input type ='text' name ='value'> <button type = 'submit'>Send</button></form> </html>";
  // res.write("<html> ");
  // res.write("<head><title>My first webpage via node server</title></head>");
  // res.write("<body>Hello from Node server</body>");
  // res.write("</html> ");

  // get url from response
  const { url, method } = req;

  if (url === "/") {
    res.write(inputHTML);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("datafromServer.txt", "TEST");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else {
    res.write(messageHTML);
    res.end();
  }
});

// listen for the server

server.listen(3000);
