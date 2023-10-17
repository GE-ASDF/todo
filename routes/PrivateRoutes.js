const router = require("express").Router();
const {PrivateControllers} = require("../src/api/controllers/Private/PrivateControllers");
const tasksCreateValidations = require("../src/api/validations/tasks.validations");
const UsersValidations = require("../src/api/validations/users.validations");
const stickyCreateValidations = require("../src/api/validations/sticky.validations");

module.exports = [
    router.get("/csrfToken", (req, res)=> {
        return res.json({CSRFToken: req.csrfToken()});
    }),
    router.get("/users/all", PrivateControllers.users.all),
    router.get("/users/one/:id", UsersValidations.usersOneValidations, UsersValidations.checkRules,PrivateControllers.users.one),
    router.post("/users/create",UsersValidations.usersCreateValidations,UsersValidations.checkRules, PrivateControllers.users.create),
    router.get("/categories/all", PrivateControllers.categories.all),
    router.get("/tasks/today/:date", tasksCreateValidations.tasksAllValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.today),
    router.get("/tasks/all/:iduser", tasksCreateValidations.tasksUserValidations,tasksCreateValidations.checkRules,PrivateControllers.tasks.all),
    router.post("/tasks/create",tasksCreateValidations.tasksCreateValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.create),
    router.get("/tasks/done/:id",tasksCreateValidations.tasksDoneValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.done),
    router.get("/tasks/delete/:id",tasksCreateValidations.tasksDoneValidations,tasksCreateValidations.checkRules ,PrivateControllers.tasks.delete),
    router.post("/sticky/create",stickyCreateValidations.stickyCreateValidations,stickyCreateValidations.checkRules, PrivateControllers.sticky.create),
    router.get("/sticky/delete/:id",stickyCreateValidations.stickyDeleteVations,stickyCreateValidations.checkRules, PrivateControllers.sticky.delete),
    router.get("/sticky/all/:iduser",stickyCreateValidations.stickyAllValidations,stickyCreateValidations.checkRules, PrivateControllers.sticky.all)
]

