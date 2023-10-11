const router = require("express").Router();
const {PublicControllers} = require("../src/api/controllers/Public/PublicControllers");
const {authValidationsRules,checkAuthRules} = require("../src/api/validations/auth.validations");
module.exports = [
    router.get("/auth/:Usuario?/:Senha?", authValidationsRules,checkAuthRules, PublicControllers.auth),
]

