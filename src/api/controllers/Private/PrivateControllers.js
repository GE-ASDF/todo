
const UsersSerivce = require("../../services/UsersService");
const TaskService = require("../../services/TaskService");
const CategoriesService = require("../../services/CategoriesService");
const StickyService = require("../../services/StickyService");
const DashboardService = require("../../services/DashboardService.js")
exports.PrivateControllers = {
    dashboard:{
        dash:DashboardService.Dashboard
    },
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
        delete:StickyService.Delete
    },
    tasks:{
        create:TaskService.Create,
        all:TaskService.All,
        today:TaskService.Today,
        done:TaskService.Done,
        one:TaskService.One,
        delete:TaskService.Delete,
        changePriority:TaskService.ChangePriority
    }
}