const {check, validationResult} = require("express-validator")

exports.authValidationsRules = [
    check("user", "O usuário é obrigatório").trim().notEmpty().escape(),
    check("password", "A senha é obrigatória").trim().notEmpty().escape(),
]

exports.checkAuthRules = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    next();
}