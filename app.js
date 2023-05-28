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
  // console.log(req);

  const messageHTML =
    "<html> <head><title>Node Test</title></head> <body>Hello from Node server</body> </html>";
  res.setHeader("Content-Type", "text-html");

  const inputHTML =
    " <html> <form action = '/message' method = 'POST'><input type ='text' name ='value'> <button type = 'submit'>Send</button></form> </html>";

  // get url from response
  const { url, method } = req;

  if (url === "/") {
    res.write(inputHTML);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // adding a listener on req to get chunks of data
    // this listener listens for every change in chunk of data

    const body = [];
    req.on("data", (incomingData) => {
      console.log(incomingData, "incomingData");
      body.push(incomingData);
      console.log(body, "body");
    });

    // stop the listener

    req.on("end", () => {
      // to change binary to readable we use buffer
      const completedMessage = Buffer.concat(body).toString();
      console.log(completedMessage);

      const message = completedMessage.split("=")[1];
      fs.writeFileSync("datafromServer.txt", message);
    });

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
