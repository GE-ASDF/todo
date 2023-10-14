
const UsersSerivce = require("../../services/UsersService");
const TaskService = require("../../services/TaskService");
const CategoriesService = require("../../services/CategoriesService");
const StickyService = require("../../services/StickyService");

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
    sticky:{
        create:StickyService.Create,
        all:StickyService.All,
    },
    tasks:{
        create:TaskService.Create,
        all:TaskService.All,
        today:TaskService.Today
    }
}