require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 3003,
    DBCONFIG: {
        host:process.env.HOST_DB,
        user:process.env.USER_DB,
        password:process.env.PASS_DB,
        database:process.env.DBNAME,
        port:process.env.PORT_DB
    },
    APP_SECRET: process.env.APP_SECRET,
    URL_FRONTEND: process.env.URL_FRONTEND
}