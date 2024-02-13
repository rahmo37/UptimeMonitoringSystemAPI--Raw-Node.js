/**
 * Title: Helper module handling request and response
 * Description: This module handles handles response and request
 * Author Obeadur Rahman
 * Date: 13-Feb-24
 */

// !Dependencies
//* String Decoder
// The string_decoder module in Node.js is a utility for decoding binary data into strings without losing data that may be part of multi-byte characters. It's especially useful when the data stream may contain characters that require more than one byte to represent, such as characters from the UTF-8 or UTF-16 character sets. This module provides a way to ensure that these multi-byte characters are properly assembled and not mistakenly split across data chunks, which can happen if you're directly converting buffer chunks to strings.

//* Multibyte Character
// Multibyte characters are characters that require more than one byte of data to represent. In contrast to single-byte characters, which fit within 8 bits (like the ASCII character set), multibyte characters are used in character encodings such as UTF-8 or UTF-16 to represent a wide range of characters from various languages, symbols, and emojis

// desturtered the stringDecoder class from the string_decoder module to and saved it in the stringDecoder variable
const { StringDecoder } = require("string_decoder");

const url = require("url");

// The double dots (..) represent a move up one level in the directory hierarchy from the current directory.
const routes = require("../routes");

const {
  notFoundHandler,
} = require("../Handlers/routeHandlers/notFoundHandler");

// -----------------------------------------------------------------------------------

// !Module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // we need to make the response dynamic, therefore we need to work with the url path. for different url route our response will be dynamic. we are using the built in url module for that.

  // *QUERY STRINGS,
  // so query strings are part of a url, that assigns values to specified parameters. They start after the question mark(?) and are seperated by ampersand(&). each query string is consists of key and value speperated by the equal sign.They are used to pass data to the servar as part of the URL. Lets see an example, http://example.com?search=keyword?sort=ascending', here the search=keyword and  sort=ascending are the query strings

  // *URL.PARSE
  // URL.PARSE is a method in node.js used to parse a url string into an object for easy access to its different parts. such as hostname, path, query strings etc. it takes a URL as a string input and returns a URL object. This object makes it easier to work with the component of a URL.
  // The second parameter (True/False), tells the method to also parse the query strings into an object as well. this means instead of getting the query string as a plain string in the query property we can map each query parameter to its value

  //! Note: IMPORTANT INFO
  /**
   * the query string always comes after the path and is introduced by a question mark (?). It stays at the end of the URL path and before any fragment identifier (#) if one is used. The query string is used to pass key-value pairs of information to the server
   */

  /**
* *Here's how a URL is typically structured:
 Scheme: Indicates the protocol (e.g., http, https).
 Host: The domain name or IP address.
 Port (optional): The port number after a colon.
 Path: The resource on the web server to access.
 Query String (optional): Starts with ?, followed by key-value pairs separated by &.
 Fragment (optional): An internal page reference starting with #.

 http://www.example.com/path/to/resource?query1=value1&query2=value2#section1
*/

  const parsedUrl = url.parse(req.url, true);

  // saving the pathname in the path variable. but some time the backslashes could be in the path name, which would create include unwanted path for our routes, so we would like to trim any backslasesh from the left and from the right of the path.
  // We are using the replace method and a regular expression to trim the path

  //   .replace(/^\/+|\/+$/g, "") is a regular expression used with the replace method. This expression targets slashes at the start (^\/+) and end (\/+$) of the string.
  // ^\/+ matches one or more slashes at the beginning of the string.
  // \/+$ matches one or more slashes at the end of the string.
  // g is a flag for global search, meaning it will replace all matches found in the string, not just the first one.
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");

  // parsing the method used to sed the request
  const method = req.method.toLowerCase();

  // grabbing the queryString object, which has all the query strings
  const queryString = parsedUrl.query;

  // *Headers
  // When an HTTP request is sent, headers are key-value pairs sent between the client and server, which provide essential information about the request or response. Headers can include metadata such as the type of web browser being used, the types of data the client can accept, the size of the request body, and authentication information, among others. These headers help the server understand how to process the request and format the response

  // req.headers property returns the header object sent by the user's request
  const headerObj = req.headers;

  // *Request body or payload
  // The request body, or payload, in an HTTP request is the part of the request that contains the actual data being sent to the server. This data can represent content you want to upload or submit to the server, such as form data, file uploads, or JSON objects in the case of API requests. The request body is used with request methods that submit data to the server, like POST, PUT, and PATCH, allowing the client to send structured information to the server. The presence and structure of the request body are usually described by the request headers, with Content-Type indicating the type of data being sent (e.g., application/json, multipart/form-data) and Content-Length indicating the size of the data in bytes. The request body is essential for operations that involve creating or updating resources on the server

  // Lets use an instance of the stringDecoder class
  const decoder = new StringDecoder("utf-8");
  let data = "";

  // Checking is the route exists in the route module, if it doesnot we call the not found method
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  // !Start From here... Revise and verbally explain what you've done in the previous lesson then continue from, 47:00

  req.on("data", (buffer) => {
    data += decoder.write(buffer);
  });

  req.on("end", () => {
    // *data += decoder.end(); why do we append decoder.end() in the data?
    // data += decoder.end(); ensures that your decoded data string is complete and includes any final characters that were only partially received before the stream ended. This step is essential for accurately representing the original data, especially when dealing with text that includes multi-byte characters.
    data += decoder.end();

    console.log(data);
    // handle response
    res.end("Data read finished!");
  });
};

module.exports = handler;
