const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require("cors");

app.use(express.static("public"));
app.use(body.urlencoded({extended:true, limit:"50mb", parameterLimit:50000}));
app.use(body.json());
app.use(cors());




module.exports = {app};
