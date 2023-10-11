const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { invalidData } = require("../src/api/constants/Users");
const bcrypt = require("bcrypt");
exports.createToken = (user)=>{
    if(!user){
        return invalidData;
    }
    return jwt.sign({user}, config.APP_SECRET);
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

