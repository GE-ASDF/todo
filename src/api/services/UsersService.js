const { matchedData } = require("express-validator");
const { passwordCreate, dateISOString, extractDataFromObject, passwordVerify } = require("../../../utils/utils");
const { notFound, emptyData, userAlreadyExistsMessage, errorCreatingUser, successMessage } = require("../constants/Users");
const Users = require("../models/Users.model");
const {user} = require("../database/user");
const logger = require("../../../config/logger");

module.exports = {
    /**
     * Este Service cria um novo usuário no banco de dados
     * @param {Request} req - A requisição HTTP
     * @param {Response} res - A resposta HTTP
     * @returns {object} Retorna todos os usuários.
     */
    async Create(req, res){
        let data = matchedData(req);
        //criptografa a senha do usuário
        data.password = await passwordCreate(data.password);
        // adiciona as datas de criação e atualização do usuário
        data.createdAt = dateISOString();
        data.updatedAt = dateISOString();
        try{
            const userExist = await new Users().one({where:'user = ?', data:[data.user]});
            if(userExist.user.length > 0){
                return res.json({error:true, message:userAlreadyExistsMessage});
            }
            const {created} = await new Users().setUsers(data).create();
            logger.info("Um novo usuário foi registrado no banco de dados.");
            return res.json({error: false, message:successMessage, created});
        }catch(error){
            logger.error(errorCreatingUser +" "+ error);
            return res.status(500).json({error:true, message:errorCreatingUser})
        }
    },
    async Update(req, res){
        const data = matchedData(req);
        const user = req.user;
        if(data.password){
            if(data.password.length >= 6){
                const regex = /[a-zA-Z]/
                const test = regex.test(data.password);
                if(test == false){
                    return res.json({error: true, message:"A senha deve ter no mínimo uma letra."})
                }
            }else{
                return res.json({error: true, message:"A senha deve ter no mínimo 6 caracteres."})
            }
            
        }
        if(!user.id){
            return res.json({error: true, message:"Não foi possível atualizar o registro."})
        }
        data.id = user.id;
        data.updatedAt = dateISOString();
        let updated = '';
        if(data.password){
            data.password = await passwordCreate(data.password);
            updated = await new Users().update({where:'id = ?', password:true, data:[data.name, data.password, data.updatedAt, data.id]})
        }else{
            updated = await new Users().update({where:'id = ?', data:[data.name, data.updatedAt, data.id]})
        }
        if(updated.updated.affectedRows > 0){
            req.session.user.name = data.name;
            return res.json({error: false, message:"O registro foi atualizado com sucesso."})
        }
        return res.json({error: true, message:"O registro não foi atualizado."})
    },
    async Delete(req, res){

    },
    /**
     * Este Service busca todos os usuários
     * @param {Request} req - A requisição HTTP
     * @param {Response} res - A resposta HTTP
     * @returns {Array<user>} Retorna todos os usuários.
     */
    async All(req, res){
        const select = await new Users().all();
        if(select.users.length > 0){
            return res.json(select.users)
        }
        return res.json({error: true, message:emptyData})
    },
    /**
     * Este Service busca um usuário no banco de dados pelo id dele
     * @param {Request} req - A requisição HTTP
     * @param {Response} res - A resposta HTTP
     * @returns {user} Retorna um usuário do banco de dados.
     */
    async One(req, res){
        try{
            //Retorna o usuário caso não aconteça nenhum erro
            const data = matchedData(req);
            const userExist = await new Users().one({where:'id = ?', data:[data.id]})
            if(userExist.user){
                logger.info(`O usuário de id ${data.id} não foi encontrado`)
                return res.json(userExist.user)
            }
            logger.info(`O usuário de id ${data.id} foi encontrado`)
            return res.json({error: true, message:notFound})
        }catch(error){
            // Caso aconteça algum erro
            logger.error(`Ocorreu um erro ao tentar buscar um usuário: ${error}`)
            return res.status(500).json({ error: true, message: "Erro ao buscar usuário." });
        }
    }
}