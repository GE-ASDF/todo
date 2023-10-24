const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { invalidData } = require("../src/api/constants/Users");
const bcrypt = require("bcrypt");
const { isValid, parse } = require('date-fns');

exports.createToken = (user)=>{
    if(!user){
        return invalidData;
    }
    return jwt.sign({user}, config.APP_SECRET, {expiresIn:"1d"});
}

exports.validatePasswordLength = (password)=>{
    if(password.length >= 6){
        const regex = /[a-zA-Z]/
        const test = regex.test(password);
        if(test == false){
            return {error: true, message:"A senha deve ter no mínimo uma letra."}
        }
    }else{
        return {error: true, message:"A senha deve ter no mínimo 6 caracteres."}
    }
}

exports.verifyToken = (req, res, next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            error: true,
            message:"Token não fornecido",
        })
    }

    try{
        const decoded = jwt.verify(token, config.APP_SECRET)
        req.user = decoded.user;
        if(decoded.exp < Date.now() / 1000){
            return res.status(401).json({error:true,message:'Token expirou.'})
        }
        next();
    }catch(err){
        return res.status(401).json({error:true,message:'Token inválido. Acesso não autorizado'})
    }
}
/**
 * Esta função verifica se a senha fornecida pelo usuário é igual a cadastrada no banco de dados.
 * @param {string} noHash - A senha do usuário não criptografada
 * @param {*} hash - A senha do usuário criptografada salva no banco de dados
 * @returns {boolean} Retorna verdadeiro se forem iguais e falso se não.
 */
exports.passwordVerify = async (noHash, hash)=>{
    try{
        return await bcrypt.compare(noHash, hash);
    }catch(error){
        return error;
    }
}

/**
 * Esta função cria um hash da senha do usuário para salvar no banco de dados
 * @param {string} password - a senha não criptografada
 * @param {number} salts - número de saltos para criar o hash seguro
 * @returns {string} Retorna a string da senha criptografada
 */
exports.passwordCreate = async(password, salts = 12)=>{
    try{
        return await bcrypt.hash(password, salts)
    }catch(error){
        return error;
    }
}

exports.dateISOString = ()=>{
    const date = new Date();
    const brazilian = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    return brazilian;
}

exports.extractDataFromObject = (dataObject)=>{
    return [...Object.values(dataObject)];
}

exports.validateDate = (date)=>{
    if(!date){
        return false;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    
        return isValid(parsedDate);
      }
    
      return false;
}

