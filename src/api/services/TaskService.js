const { matchedData } = require("express-validator");
const Tasks = require("../models/Tasks.model");
const { emptyData } = require("../constants/Users");
const logger = require("../../../config/logger");
const { extractDataFromObject } = require("../../../utils/utils");
const http = new Tasks();

module.exports = {
    async Today(req, res){
        const {date} = matchedData(req);
        const extract = extractDataFromObject(date);
        const select = await http.all({data:[date], where: "enddate = ?", order: "enddate DESC"});
        return res.json(select.tasks)
    },
    async All(req, res){
        const user = req.user.id
        const select = await new Tasks('tasks, categories').all({data:[user],fields:"categories.title as category_title, tasks.*",where:"iduser = ? AND categories.id = tasks.idcategory", order:'enddate DESC'});
        return res.json(select.tasks)
        
    },
    async One(req, res){
        const {id} = matchedData(req);
        const select = await new Tasks('tasks, categories').one({data:[id], fields:'categories.title as category_title, tasks.*', where:"tasks.id = ? AND categories.id = tasks.idcategory"})        
        return res.json(select.task);
    },
    async ChangePriority(req, res){
        const data = matchedData(req);
        const changePriority = await http.changePriority(data.id, data.priority);
        if(changePriority.changed.affectedRows > 0){
            return res.json({error:false, message:"Prioridade alterada."})
        }
        return res.json({error:true, message:"Prioridade não alterada."})
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