const { matchedData } = require("express-validator");
const Sticky = require("../models/Sticky.model");
const { emptyData, successMessage, deletedSuccessMessage } = require("../constants/Users");
const logger = require("../../../config/logger");
const { extractDataFromObject } = require("../../../utils/utils");

module.exports = {
    async All(req, res){
        const data = matchedData(req);
        const select = await new Sticky('sticky').all({data:[data.iduser],where:"iduser = ?"});
        if(select.sticky.length > 0){
            return res.json(select.sticky)
        }
        return res.json({error: true, message:emptyData})
    },
    async Create(req, res){
        const data = matchedData(req);
        const http = new Sticky();
        const insert = await http.setSticky(data).create();
        logger.info(`O usuário ${data.iduser} inseriu uma anotação`)
        insert.error = false;
        return res.json({error:false, message:successMessage, insert});
    },
    async Delete(req, res){
        const data = matchedData(req);
        const http = new Sticky();
        const deleted = await http.setSticky(data).delete({where:'id = ?'});
    
        if(deleted.error){
            return res.json(deleted);
        }
        logger.info(`O usuário ${data.iduser} apagou uma anotação`)
        deleted.error = false;
        return res.json({error:false, message:deletedSuccessMessage, deleted});
    }
}