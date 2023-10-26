const { matchedData } = require("express-validator");
const Sticky = require("../models/Sticky.model");
const { emptyData, successMessage, deletedSuccessMessage } = require("../constants/Users");
const logger = require("../../../config/logger");
const { extractDataFromObject } = require("../../../utils/utils");

module.exports = {
    async All(req, res){
        const data = matchedData(req);
        const itemsPerPage = 10;
        const totalStickies = await new Sticky('sticky').all({data:[req.user.id],where:"iduser = ?"});
        const maxPages = Math.floor(totalStickies.sticky.length / itemsPerPage);
        let startIndex = (data.limit - 1) * itemsPerPage;
        if(startIndex <= 1){
            startIndex = 0;
        }
        const endIndex = startIndex + itemsPerPage
    
        const select = await new Sticky('sticky').all({data:[req.user.id],where:"iduser = ?", limit:`0, ${endIndex}`});
        return res.json({sticky: select.sticky, maxPages,totalStickies:totalStickies.sticky.length})
        
    
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
        logger.info(`O usuário ${req.user.id} apagou uma anotação`)
        deleted.error = false;
        return res.json({error:false, message:deletedSuccessMessage, deleted});
    }
}