console.log("Hello from node");

// Import which allows to write files to system
const fileSystem = require("fs");

// write file sync from import

/**
 * takes in two args
 *  first one is file name anbd type, path
 * second one is content
 */

fileSystem.writeFileSync("test.txt", "Hello from fs of node");
