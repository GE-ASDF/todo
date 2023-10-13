const router = require("express").Router();
const {PublicControllers} = require("../src/api/controllers/Public/PublicControllers");
const {authValidationsRules,checkAuthRules} = require("../src/api/validations/auth.validations");
const { verifyToken } = require("../utils/utils");
module.exports = [
    router.get("/token",verifyToken, PublicControllers.token),
    router.post("/auth", authValidationsRules, checkAuthRules, PublicControllers.auth),
]

