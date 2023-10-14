const { matchedData } = require("express-validator");
const Tasks = require("../models/Tasks.model");
const { emptyData } = require("../constants/Users");
const logger = require("../../../config/logger");

module.exports = {
    async All(req, res){
        const select = await new Tasks().all();
        if(select.tasks.length > 0){
            return res.json(select.tasks)
        }
        return res.json({error: true, message:emptyData})
    },
    async Create(req, res){
        const data = matchedData(req);
        const http = new Tasks();
        const insert = await http.setTasks(data).create();
        logger.info(`O usuário ${data.iduser} inseriu uma tarefa`)
        insert.error = false;
        return res.json(insert);
    }
}