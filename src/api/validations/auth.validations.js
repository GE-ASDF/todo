const {check, validationResult} = require("express-validator")

exports.authValidationsRules = [
    check("Usuario", "O usuário é obrigatório").trim().notEmpty().escape(),
    check("Senha", "A senha é obrigatória").trim().notEmpty().escape(),
]

exports.checkAuthRules = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    next();
}