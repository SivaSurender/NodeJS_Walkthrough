const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const greetHTML =
    "<html><body><title>Welcome</title> <h1>Welcome to login Page</h1> <form action ='/create-user' method='POST'><label>Enter UserName</label> <input type ='text' name ='value'/><button type = 'submit'>Submit</button></form></body></html>";

  const userHTML =
    "<html><body><title>Users</title> <h1>User List</h1> <ul><li>User One</li><li>User Two</li> <li>User Three</li></ul></body></html>";

  const fallBackHTML =
    "<html><body><title>Users</title> <h1>Page Not Found, please try again Later</h1> </body></html>";

  if (url === "/") {
    res.write(greetHTML);
    return res.end();
  }

  if (url === "/users") {
    res.write(userHTML);
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const dataArr = [];
    req.on("data", (incomingChunk) => {
      // console.log(incomingChunk);
      dataArr.push(incomingChunk);
    });

    return req.on("end", () => {
      const parsedMessage = Buffer.concat(dataArr).toString();
      const finalMessage = parsedMessage.split("=")[1];
      // fs.writeFileSync("ex.txt", finalMessage);
      console.log(finalMessage);

      fs.writeFile("example", finalMessage, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // fallback page
  res.write(fallBackHTML);
  res.end();
  return;
});

server.listen(3000);
