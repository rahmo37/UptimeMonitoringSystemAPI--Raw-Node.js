/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Obaedur Rahman
 * Date: 06-Feb-2024
 */

// !dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

// !app object - module scaffolding
const app = {};

//@TODO: Testing file system, will be deleted later
data.create(
  "test",
  "Country",
  { name: "Bangladesh", language: "Bangla" },
  (err, data) => {
    console.log(err, data);
  }
);

// data.delete("test", "Country", (err) => {
//   console.log(err);
// });

app.handleReqRes = handleReqRes;

// !create server
// Using an anonymous arrow function to create a server, and save it in the app.createServer property

// When you call server.listen(environment.port, callback()), your server starts listening on the specified port and is ready to accept incoming requests. The callback function inside app.handleReqRes is triggered whenever a request is received. The listening process is essentially your server running and waiting for incoming connections; it's separate from the request handling logic. Once a request arrives, the Node.js HTTP server invokes your app.handleReqRes function to process the request.
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Listening to port ${environment.port}`);
  });
};

// Start the server
app.createServer();

// ----------------------

// ?What are environment variables?
// Environment variables are key-value pairs that are used to configure the operating system or applications. They contain information that can control the behavior of software on a computer. These variables can be accessed by processes running on the system and can influence the way these processes operate.

// ?Explain the Environment variable in the context of Node.js
// In the context of Node.js, environment variables are used to provide configuration and runtime settings for Node.js applications. These variables are crucial for managing application behavior without hard-coding configuration details, which makes your code more secure and adaptable to different environments. Environment variables can store configuration settings such as database connection details, API keys, and other sensitive information that should not be hard-coded into the application's source code. This helps in keeping sensitive data out of version control and allows for easy changes without modifying the code

// ?Why do we use environment variables?
// When we create an application, we might need to create a seperate environment for that application. The Variables may change, depending on different environment. now if we hard-code these variables, our application might not be completely dynamic. so we use Environment variables that changes depending on Specific environments. When developing an application, it's common to encounter different environments such as development, testing, and production. Each of these environments might require different settings, like database URLs, API keys, or other configuration details. Hard-coding these variables directly into the application's codebase is not practical because it reduces flexibility and can lead to security risks. Instead, using environment variables allows these settings to be defined outside of the application, making it easier to manage and change them without altering the code. This approach makes your application more dynamic and adaptable to various environments.

// We provide a key/value pair in the terminal when we are running our application, and then we can access those variables in out application.

// ? How do we use the env variable in windows environment? Whats the syntax?
// $env:NODE_ENV="production"; node index.js.

// ? How do we access the environment variable in the node.js application?
// we use the process.env.ENV_VAR to access the environment variable

// ? $env:SERVER_PORT=3000; setting the variable like this would it set permanently or only for this session?
// Setting the environment variable with $env:SERVER_PORT=3000; in terminal sets it only for the current session. This means the variable will be available for as long as the terminal window is open. Once you close the terminal session or terminal window, the environment variable SERVER_PORT will no longer be set.

// ?How can we provide multiple env variable in one command
// follow this syntax, $env:SERVER_PORT=3000; $env:TEST_VAR="Test"; node index.js
