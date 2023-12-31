const { matchedData, cookie } = require("express-validator")
const Users = require("../models/Users.model");
const { notFound, invalidUserOrPass } = require("../constants/Users");
const { passwordVerify, createToken } = require("../../../utils/utils");

module.exports = {
    async auth(req, res){
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
        req.session.user = data.user[0];
        delete data.user[0].password;
        const token = createToken(data.user[0]);
        data.user[0].token = token;
        return res.json({error:false, token, user: data.user[0], message:"Usuário logado com sucesso."});

    },
    logout(req, res){
        const cookies = req.cookies;
        if(req.session.user != undefined){
            req.session.user = undefined;
            res.clearCookie('LOGIN_USER')
            return res.json({error: false, message:"Session destroyed"})
        }
        return res.json({error:true, message:"Session not destroyed"})
    },
    verifyAuth(req, res){
        if(req.session.user){
            return res.json({error:false, user:req.session.user})
        }
        return res.json({error:true, message:"Session not created"})
    }
}

    