const { check, validationResult } = require("express-validator");
const { invalidData } = require("../constants/Users");


exports.stickyCreateValidations = [
    check("iduser","O id do usuário é obrigatório").trim().notEmpty().escape().isInt(),
    check("title","O título da anotação não pode estar vazio").trim().notEmpty().isLength({min:'2'}).escape(),
    check("body","O corpo da anotação não pode estar vazio.").trim().notEmpty().isLength({min:2}).escape(),
]

exports.stickyAllValidations = [
    check("iduser","O id do usuário é obrigatório").trim().notEmpty().escape().isInt(),
]

exports.checkRules = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.error = true;
        errors.type = "fields";
        return res.json(errors);
    }
    next();
}