/**
 * Title: Data Handling
 * Description: A data related works
 * Author: Obaedur Rahman
 * Date: 20-Feb-24
 */

// dependencies
const fs = require("fs");
const path = require("path");

// module scaffolding
const lib = {};

// base ddirectory of the data file
// __dirname is a Node.js global variable that holds the absolute path of the directory containing the current module (JavaScript file).
// path.join is a method from Node.js's path module that combines multiple path segments into a single path. It ensures that the correct directory separators are used for the operating system.
// "/../.data/" specifies a path segment that moves up one directory from __dirname (due to ..) and then into a directory named .data.
// lib.basedir is set to the resulting path, making it a reference to the .data directory's absolute path.
lib.basedir = path.join(__dirname, "/../.data/"); // joining and creating .data directory's absolute path.

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing

  // path: A string or Buffer that specifies the path to the file you want to open.
  // flags: A string that specifies how the file should be opened. Common flags include 'r' for reading, 'w' for writing (and truncating the file if it exists), 'a' for appending, and 'wx' for writing but failing if the file exists.
  // mode (optional): An integer that sets the file mode (permissions and sticky bits) if the file is created. This is not necessary if the file already exists. The default mode is 0o666, which allows read and write operations.
  // callback: A function that gets called once the operation completes. The callback function receives two arguments: an error (if an error occurred) and a file descriptor fd, which is a numeric identifier for the opened file.

  // wx file syatem flag explanation
  // w stands for writing. It opens the file for writing, positioning the stream at the beginning of the file. If the file does not exist, it is created.
  // x is for exclusive. It ensures that the operation fails if the file already exists.

  // A file descriptor is essentially an identifier for an open file. It's used by the operating system and by applications (like those written in Node.js) to keep track of which file operations (reading, writing, closing, etc.) apply to which file. and providing a straightforward way to manage file operations

  // Opeing file with the correct flag to write to it
  fs.open(
    `${lib.basedir + dir}/${file}.json`,
    "wx",
    function (err, fileDescriptor) {
      // if no error and the a valid file descreptor was sent
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);

        //Writing to the file, with the fileDescriptor provided
        fs.writeFile(fileDescriptor, stringData, function (err) {
          // If no err
          if (!err) {
            // Closing the file when done
            fs.close(fileDescriptor, function (err) {
              // if no err in the callback we just send false
              if (!err) {
                callback(false);
              } else {
                // if error occurs however we send a error message
                callback("Error closing the new file!");
              }
            });
          } else {
            // if error occurs however we send a error message
            callback("Error writing to new file!");
          }
        });
      } else {
        // if error occurs however we send a error message
        callback("Could not create file, it may already exitst");
      }
    }
  );
};

// This read function reads data from the file specified
// This function takes the directory from which the data should be read,
// The name of the file that should be read
// and a callback function that will be called with the data it self and the err if there are any
lib.read = (dir, file, callback) => {
  // We create the full file path using the dir and the file parameters and pass the full path in the readFile method,
  // We specify the encoding of the file
  // Then we call the callback function where we pass the err and the data
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};

// Update existing file
lib.update = (dir, file, data, callback) => {
  // first lets open the file for update
  // r+ lets you both read and write. if the file does not exist an exception will be thrown
  fs.open(
    `${lib.basedir + dir}/${file}.json`,
    "r+",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert the data to string
        const stringData = JSON.stringify(data);

        // ftruncate, truncates a file
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            // Write in the file and then close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                // close the file
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback(`Error while closing the file`);
                  }
                });
              } else {
                callback(`Error while closing the file`);
              }
            });
          } else {
            console.log(`Error while truncting the file`);
          }
        });
      } else {
        console.log(`Err Updating the file and may not exist`);
      }
    }
  );
};

// now lets delete a file
lib.delete = (dir, file, callback) => {
  // unlink/delete a file
  // We use the unlink funtion to delete a file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error while deleting the file`);
    }
  });
};

// Export the module
module.exports = lib;
