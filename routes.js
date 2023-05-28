const fs = require("fs");

const requestHandler = (req, res) => {
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
    // this listener listens for every change in chunk of data, new chunk ready to be read

    const body = [];
    req.on("data", (incomingData) => {
      console.log(incomingData, "incomingData");
      body.push(incomingData);
      console.log(body, "body");
    });

    // stop the listener
    //will be fired once its done parsing the incoming data
    return req.on("end", () => {
      // to change binary to readable we use buffer
      const completedMessage = Buffer.concat(body).toString();
      console.log(completedMessage);

      const message = completedMessage.split("=")[1];
      // writes in sync
      // fs.writeFileSync("datafromServer.txt", message);

      // to do it in async manner

      fs.writeFile("dataFromServer", message, (err) => {
        // execcute this block once all done
        res.statusCode = 302;
        res.setHeader("Location", "/message");
        return res.end();
      });
    });
  } else {
    res.write(messageHTML);
    res.end();
  }
};

module.exports = requestHandler;

//exports.handler = requestHandler

// module.exports = {
//   handler: requestHandler,
//   txt: "test code",
// };

// module.exports.handler = requestHandler;
// module.exports.txt = "test code";
