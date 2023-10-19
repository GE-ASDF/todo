const {auth, logout, verifyAuth} = require("../../services/AuthService");
const {TokenService} = require("../../services/TokenService")

exports.PublicControllers = {
    auth:auth,
    logout:logout,
    verify:verifyAuth,
    token:TokenService,
}