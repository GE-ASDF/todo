const { matchedData } = require("express-validator");
const Tasks = require("../models/Tasks.model");
const { emptyData } = require("../constants/Users");
const logger = require("../../../config/logger");
const { extractDataFromObject } = require("../../../utils/utils");
const http = new Tasks();
module.exports = {
    async Today(req, res){
        const {date} = matchedData(req);
        const token = req.header("X-CSRF-Token")
        console.log(token)
        const extract = extractDataFromObject(date);
        const select = await http.all({data:[date], where: "enddate = ?", order: "enddate DESC"});
        if(select.tasks.length > 0){
            return res.json(select.tasks)
        }
        return res.json({error: true, message:emptyData})
    },
    async All(req, res){
        const data = matchedData(req);
        const select = await new Tasks('tasks, categories').all({data:[data.iduser],fields:"categories.title as category_title, tasks.*",where:"iduser = ? AND categories.id = tasks.idcategory", order:'enddate DESC'});
        if(select.tasks.length > 0){
            return res.json(select.tasks)
        }
        return res.json({error: true, message:emptyData})
    },
    async Create(req, res){
        const data = matchedData(req);
        const insert = await http.setTasks(data).create();
        logger.info(`O usuário ${data.iduser} inseriu uma tarefa`)
        insert.error = false;
        return res.json(insert);
    },
    async Done(req, res){
        const data = matchedData(req);
        const update = await http.done({where:[data.id]});
        if(update.affectedRows > 0){
            return res.json({error: false, message:'Registro atualizado com successo.', update});
        }
        return res.json({error: true, message:'Registro não foi atualizado.', update});
    },
    async Delete(req, res){
        const data = matchedData(req);
        const deleted = await http.delete({where:[data.id]});

        if(deleted.affectedRows && deleted.affectedRows > 0){
            return res.json({error: false, message:'Registro apagado com successo.', deleted});
        }
        if(deleted.error){
            return res.json(deleted);
        }
        return res.json({error: true, message:'Registro não foi apagado.', deleted});
    }
}