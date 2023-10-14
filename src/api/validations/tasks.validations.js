const { check, validationResult } = require("express-validator");
const { isValid, parse } = require('date-fns');

exports.tasksCreateValidations = [
    check('iduser','O id do usuário é obrigatório').trim().escape().notEmpty().isInt(),
    check('title','O título é obrigatório e deve ter no máximo 50 caracteres.').trim().escape().notEmpty(),
    check('description','A descrição é obrigatória e deve ter no máximo 255 caracteres').trim().escape().optional(),
    check('priority','A prioridade é obrigatória.').trim().escape().notEmpty().isInt(),
    check('idcategory','A categoria é obrigatória').trim().escape().notEmpty().isInt(),
    check('enddate','A data de fim é obrigatória').trim().escape().notEmpty().custom((date)=>{
        if(!date){
            return false;
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        
            return isValid(parsedDate);
          }
        
          return false;

    }).withMessage("A data informada é inválida."),
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