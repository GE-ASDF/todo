
const UsersSerivce = require("../../services/UsersService");
const TaskService = require("../../services/TaskService");
const CategoriesService = require("../../services/CategoriesService");

exports.PrivateControllers = {
    users:{
        one:UsersSerivce.One,
        all:UsersSerivce.All,
        create:UsersSerivce.Create,
        update:UsersSerivce.Update,
        delete:UsersSerivce.Delete,
    },
    categories:{
        all:CategoriesService.All,
    },
    tasks:{
        create:TaskService.Create
    }
}