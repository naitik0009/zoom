const express = require("express");

const app = express();
const path = __dirname+"/public";
// console.log(path);
app.use("/",express.static(path));

module.exports = app;