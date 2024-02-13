/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Obaedur Rahman
 * Date: 06-Feb-2024
 */

// !dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// !app object - module scaffolding
const app = {};

// !configuration
app.config = {
  port: 3000,
};

app.handleReqRes = handleReqRes;

// !create server
// Using an anonymous arrow function to create a server, and save it in the app.createServer property
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Listening to port ${app.config.port}`);
  });
};

// Start the server
app.createServer();
