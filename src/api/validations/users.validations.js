const { check, validationResult } = require("express-validator");
const { invalidData } = require("../constants/Users");

exports.usersOneValidations = [
    check('id', invalidData).trim().notEmpty().isInt(),
]

exports.usersCreateValidations = [
    check("name","O campo nome não pode estar vazio.").trim().notEmpty().isLength({min:'2'}).escape(),
    check("user","Critérios para o campo usuário: ter no mínimo dois caracteres, iniciar com uma letra e o restante devem ser números.").trim().notEmpty().isLength({min:'2'}).custom((user)=> /^^[a-zA-z][0-9]*$/g.test(user)).escape(),
    check("password","Os critérios para a senha são: ter no mínimo 6 caracteres e possuir pelo menos uma letra.").trim().notEmpty().isLength({min:6}).custom((pass)=> /[a-zA-Z]/.test(pass)).escape(),
]

exports.checkRules = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    next();
}