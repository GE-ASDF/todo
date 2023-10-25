const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csrf = require("csurf");
const {URL_FRONTEND} = require("../config/config");
const { createToken } = require("../utils/utils");
app.use(cors({
    origin:[URL_FRONTEND],
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
        maxAge:3600 * 1000 * 24,
        httpOnly:false,
    }
}))

const csrfProtection = csrf({cookie: true})
app.use(express.static("public"));
app.use(body.urlencoded({extended:true, limit:"50mb", parameterLimit:50000}));
app.use(body.json());



module.exports = {app, csrfProtection};
