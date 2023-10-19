const router = require("express").Router();
const {PublicControllers} = require("../src/api/controllers/Public/PublicControllers");
const {authValidationsRules,checkAuthRules} = require("../src/api/validations/auth.validations");
const { csrfProtection } = require("../src/app");

const { verifyToken } = require("../utils/utils");

module.exports = [
    router.get("/csrfToken",csrfProtection, (req, res)=> {
        return res.send({csrfToken:req.csrfToken()});
    }),
    
    router.get("/token",verifyToken, PublicControllers.token),
    router.post("/auth", csrfProtection, authValidationsRules, checkAuthRules, PublicControllers.auth),
    router.get("/auth",PublicControllers.verify),
    router.get("/logout", PublicControllers.logout)
]

