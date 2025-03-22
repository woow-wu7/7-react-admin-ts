module.exports.b = "b";

const a = require("./1-circularReference-a.js");
console.log("a", a);

module.exports.b = "bb";
