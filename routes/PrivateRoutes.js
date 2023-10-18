const router = require("express").Router();
const {PrivateControllers} = require("../src/api/controllers/Private/PrivateControllers");
const tasksCreateValidations = require("../src/api/validations/tasks.validations");
const UsersValidations = require("../src/api/validations/users.validations");
const stickyCreateValidations = require("../src/api/validations/sticky.validations");
const { verifyToken } = require("../utils/utils");
const {authenticateMiddleware} = require("../src/api/middlewares/authenticate")

module.exports = [
    router.get("/users/all",authenticateMiddleware,verifyToken, PrivateControllers.users.all),
    router.get("/users/one/:id",authenticateMiddleware,verifyToken, UsersValidations.usersOneValidations, UsersValidations.checkRules,PrivateControllers.users.one),
    router.post("/users/create", UsersValidations.usersCreateValidations,UsersValidations.checkRules, PrivateControllers.users.create),
    router.get("/categories/all",authenticateMiddleware,verifyToken, PrivateControllers.categories.all),
    router.get("/tasks/today/:date",authenticateMiddleware,verifyToken, tasksCreateValidations.tasksAllValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.today),
    router.get("/tasks/all/:iduser",authenticateMiddleware,verifyToken, tasksCreateValidations.tasksUserValidations,tasksCreateValidations.checkRules,PrivateControllers.tasks.all),
    router.post("/tasks/create",authenticateMiddleware,verifyToken,tasksCreateValidations.tasksCreateValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.create),
    router.get("/tasks/done/:id",authenticateMiddleware,verifyToken,tasksCreateValidations.tasksDoneValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.done),
    router.get("/tasks/delete/:id",authenticateMiddleware,verifyToken,tasksCreateValidations.tasksDoneValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.delete),
    router.post("/sticky/create",authenticateMiddleware,verifyToken,stickyCreateValidations.stickyCreateValidations,stickyCreateValidations.checkRules, PrivateControllers.sticky.create),
    router.get("/sticky/delete/:id",authenticateMiddleware,verifyToken,stickyCreateValidations.stickyDeleteVations,stickyCreateValidations.checkRules, PrivateControllers.sticky.delete),
    router.get("/sticky/all/:iduser",authenticateMiddleware,verifyToken,stickyCreateValidations.stickyAllValidations,stickyCreateValidations.checkRules, PrivateControllers.sticky.all)
]

