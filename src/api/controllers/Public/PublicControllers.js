const {AuthService} = require("../../services/AuthService");
const {TokenService} = require("../../services/TokenService")
exports.PublicControllers = {
    auth:AuthService,
    token:TokenService,
}