const { matchedData } = require("express-validator")
const Users = require("../models/Users.model");
const { notFound, invalidUserOrPass } = require("../constants/Users");
const { passwordVerify, createToken } = require("../../../utils/utils");

exports.AuthService = async (req, res)=>{
    const {user, password} = matchedData(req);
    const http = new Users();
    const data = await http.one({data: [user], where:"user = ?"})    
    if(data.user.length <= 0){
        return res.json({error:true, message:notFound})
    }

    const comparePass = await passwordVerify(password, data.user[0].password);
    if(!comparePass){
        return res.json({error:true, message:invalidUserOrPass})
    }
    delete data.user[0].password;
    const token = createToken(data.user[0]);
    return res.json({error:false, token, user: data.user[0], message:"Usuário logado com sucesso."});
}