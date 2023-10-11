const router = require("express").Router();
const {PrivateControllers} = require("../src/api/controllers/Private/PrivateControllers");
const UsersValidations = require("../src/api/validations/users.validations");

module.exports = [
    router.get("/users/all", PrivateControllers.users.all),
    router.get("/users/one/:id", UsersValidations.usersOneValidations, UsersValidations.checkRules,PrivateControllers.users.one),
    router.get("/users/create/:name/:user/:password",UsersValidations.usersCreateValidations,UsersValidations.checkRules, PrivateControllers.users.create),
]

