const express = require("express");
const app = express();
const body = require("body-parser");


app.use(body.urlencoded({extended:true}));
app.use(body.json());

module.exports = app;
