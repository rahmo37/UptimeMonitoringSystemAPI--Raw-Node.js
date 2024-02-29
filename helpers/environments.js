/**
 * Title: Environment
 * Description: Handle all environment related works
 * Author: Obaedur Rahman
 * Date: 18-Feb-2024
 */

// dependecies

// module scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
};

environments.production = {
  port: 5000,
  envName: "production",
};

// determine which envrionment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

console.log(currentEnvironment, "line 29");

// export corresponding environment object
console.log(environments[currentEnvironment], "line 30");
const environmentToExport =
  typeof environments[currentEnvironment] === "object" &&
  environments[currentEnvironment] !== null
    ? environments[currentEnvironment]
    : environments.staging;
console.log(environmentToExport, "line 36");
console.log(environments.staging, "line 37");

// Exporting module;
module.exports = environmentToExport;
