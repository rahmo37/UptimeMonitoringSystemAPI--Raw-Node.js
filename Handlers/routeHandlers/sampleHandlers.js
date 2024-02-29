/**
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Obaedur Rahman
 * Date: 13-feb-24
 */

// module scaffoleding
const handler = {};

handler.sampleHandler = (requestPropertiers, callback) => {
  console.log(requestPropertiers);
  callback(200, {
    message: "This is a sample url",
  });
};

module.exports = handler;
