/**
 * Title: not found Handler
 * Description: 404 not found handler
 * Author: Obaedur Rahman
 * Date: 13-feb-24
 */

// module scaffoleding
const handler = {};

handler.notFoundHandler = (requestPropertiers, callback) => {
  console.log(requestPropertiers);
  callback(404, {
    message: "Your requested URL was not found!",
  });
};

module.exports = handler;
