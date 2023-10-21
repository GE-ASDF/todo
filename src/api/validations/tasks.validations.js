const { check, validationResult } = require("express-validator");

const { validateDate } = require("../../../utils/utils");

exports.tasksCreateValidations = [
    check('iduser','O id do usuário é obrigatório').trim().escape().notEmpty().isInt(),
    check('title','O título é obrigatório e deve ter no máximo 50 caracteres.').trim().escape().notEmpty(),
    check('description','A descrição é obrigatória e deve ter no máximo 255 caracteres').trim().escape().optional(),
    check('priority','A prioridade é obrigatória.').trim().escape().notEmpty().isInt(),
    check('idcategory','A categoria é obrigatória').trim().escape().notEmpty().isInt(),
    check('enddate','A data de fim é obrigatória').trim().escape().notEmpty().custom(validateDate).withMessage("A data informada é inválida."),
]

exports.tasksAllValidations = [
    check('date').custom(validateDate).withMessage("A data informada é inválida")
]

exports.tasksUserValidations = [
    check('iduser').trim().notEmpty().escape().isInt(),
]
exports.tasksDoneValidations = [
    check('id').trim().notEmpty().escape().isInt(),
]
exports.tasksChangePriorityValidations = [
    check('id').trim().notEmpty().escape().isInt(),
    check('priority').trim().notEmpty().escape().isInt(),
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