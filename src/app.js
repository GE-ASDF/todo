const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csrf = require("csurf")
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST"],
    credentials:true,
}));

app.use(cookieParser())
app.use(session({
    key:"LOGIN_USER",
    secret:"LOGIN_USER",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:3600 * 24
    }
}))

const csrfProtection = csrf({cookie: true})
app.use(express.static("public"));
app.use(body.urlencoded({extended:true, limit:"50mb", parameterLimit:50000}));
app.use(body.json());



module.exports = {app, csrfProtection};
