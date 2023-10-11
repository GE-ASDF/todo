class Model{
    async connection(){
        try{

            if(global.conexao && global.conexao.state != "disconected"){
                return global.conexao;
            }
            const mysql2 = require("mysql2/promise");
            const config = require("../../../config/config");
            const con = mysql2.createConnection(config.DBCONFIG);
            global.conexao = con;
            return con;
        }catch(error){
            return error;
        }
    }
}

module.exports = Model;