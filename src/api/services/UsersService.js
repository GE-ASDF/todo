const { matchedData } = require("express-validator");
const { passwordCreate, dateISOString, extractDataFromObject, passwordVerify } = require("../../../utils/utils");
const { notFound, emptyData, userAlreadyExistsMessage, errorCreatingUser } = require("../constants/Users");
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
            return res.json(created);
        }catch(error){
            logger.error(errorCreatingUser +" "+ error);
            return res.status(500).json({error:true, message:errorCreatingUser})
        }
    },
    async Update(req, res){

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