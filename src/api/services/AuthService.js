const { matchedData } = require("express-validator")
const Users = require("../models/Users.model");

exports.AuthService = async (req, res)=>{
    const {Usuario, Senha} = matchedData(req);
    
}