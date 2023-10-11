
const UsersSerivce = require("../../services/UsersService");

exports.PrivateControllers = {
    users:{
        one:UsersSerivce.One,
        all:UsersSerivce.All,
        create:UsersSerivce.Create,
        update:UsersSerivce.Update,
        delete:UsersSerivce.Delete,
    }
}