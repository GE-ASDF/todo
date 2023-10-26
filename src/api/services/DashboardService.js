const { convertDate } = require("../../../utils/utils");
const Sticky = require("../models/Sticky.model");
const Tasks = require("../models/Tasks.model");
module.exports = {
    async Dashboard(req, res){
        const user = req.user.id;
        const tasks = await new Tasks().all({data:[user], where:"iduser = ?"})
        const stickies = await new Sticky().all({data:[user], where: "iduser = ?"})
        const qtdTasksDoned = tasks.tasks.filter((task)=> task.done > 0).length;
        const percentDoned = ((qtdTasksDoned / tasks.tasks.length) * 100).toFixed(2)
        const lateTasks = tasks.tasks.filter((task)=>{
            if(convertDate(new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br')) && !task.done){
                return task;
            }
        });
        const qtdLateTasks = lateTasks.length;
        return res.json({totalTasks: tasks.tasks.length, totalStickies: stickies.sticky.length, percentDoned, qtdTasksDoned, qtdLateTasks});
    }
}