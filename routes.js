/**
 * Title: Routes
 * Description: Application Routes
 * Author: Obaedur Rahman
 * Date: 13-Feb-24
 */

// dependencies
const { sampleHandler } = require("./Handlers/routeHandlers/sampleHandlers");


const routes = {
  sample: sampleHandler,
};


module.exports = routes;
