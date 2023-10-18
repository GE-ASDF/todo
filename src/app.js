const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST"],
    credentials:true,
}));

app.use(cookieParser())
app.use(session({
    key:"userId",
    secret:"logged",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60 * 60 * 24
    }
}))
app.use(express.static("public"));
app.use(body.urlencoded({extended:true, limit:"50mb", parameterLimit:50000}));
app.use(body.json());


module.exports = {app};
