const { extractDataFromObject } = require("../../../utils/utils");
const Model = require("../core/Model");
const tasks_database = require("../database/tasks")

class Tasks extends Model{
    #tasks;
    #tasksKeys = [...Object.keys(tasks_database.tasks)]
    constructor(table){
        super();
        this.table = table ? table:Tasks.name.toLowerCase();
    }
    
    setTasks(tasks){
        this.#tasks = tasks;
        return this;
    }
    async changePriority(id, priority){
        const sql = `UPDATE ${this.table} SET priority = ? WHERE id = ?`;
        const con = await super.connection();
        const [changed] = await con.query(sql, [priority, id])
        this.changed = changed;
        return this;
    }
    async create(){
        if(!this.#tasks) return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#tasksKeys.join(", ");
        for(let key in this.#tasksKeys){
            if(this.#tasksKeys[key] != 'description'){
                if(!this.#tasks[this.#tasksKeys[key]]){
                    return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#tasksKeys.join(", ");
                }
            }
        }
        let sql = `INSERT INTO ${this.table}(${[...this.#tasksKeys]}) VALUES(`;
        sql += '?,'.repeat(this.#tasksKeys.length);
        sql = sql.slice(0, sql.length -1) + ")";
        const data = extractDataFromObject(this.#tasks); 
        const con = await super.connection();
        const [created] = await con.query(sql, data);
        this.created = created;
        return this;
    }

    async all({fields = "*", data = [], where = '', group = '', order = '', limit = ''} = ''){
        let sql = `SELECT ${fields} FROM ${this.table}`;
        sql += where.trim() != '' ? ` WHERE ${where}`:"";
        sql += group.trim() != '' ? ` GROUP BY ${group}`:"";
        sql += order.trim() != '' ? ` ORDER BY ${order}`:"";
        sql += limit.trim() != '' ? ` LIMIT ${limit}`:"";
        const con = await super.connection();
        const [tasks] = await con.query(sql,data);
        this.tasks = tasks;
        return this;
    }
    async one({fields = "*", data = [], where = '', group = '', order = '', limit = '1'} = ''){
        let sql = `SELECT ${fields} FROM ${this.table}`;
        if(!where || data.length <= 0){
            return "Nesta consulta é preciso enviar um WHERE e o DATA"
        }
        sql += where.trim() != '' ? ` WHERE ${where}`:"";
        sql += group.trim() != '' ? ` GROUP BY ${group}`:"";
        sql += order.trim() != '' ? ` ORDER BY ${order}`:"";
        sql += limit.trim() != '' ? ` LIMIT ${limit}`:"";
        const con = await super.connection();
        const [task] = await con.query(sql,data);
        this.task = task;
        return this;
    }
    async done({where = []}){
        if(where.length <= 0){
            return {error:true, message:"Para atualizar um registro é preciso passar uma cláusula WHERE"}
        }
        await this.one({fields:"*", data:where, where:'id = ?'})
        if(!this.task){
            return {error: true, message:"Nenhuma tarefa encontrada."};
        }
        const con = await super.connection();
        if(this.task[0].done == 0){
            const sql = `UPDATE ${this.table} SET done = 1 WHERE id = ?`;
            const [doned] = await con.query(sql, [this.task[0].id])
            return doned;
        }else{
            const sql = `UPDATE ${this.table} SET done = 0 WHERE id = ?`;
            const [doned] = await con.query(sql, [this.task[0].id])
            return doned;
        }
    }
    async delete({where = []}){
        if(where.length <= 0){
            return {error:true, message:"Para atualizar um registro é preciso passar uma cláusula WHERE"}
        }
        await this.one({fields:"*", data:where, where:'id = ?'})
        if(!this.task.length >0){
            return {error: true, message:"Nenhuma tarefa encontrada."};
        }

        const sql = `DELETE FROM ${this.table} WHERE id = ?`
        const con = await super.connection();
        const [deleted] = await con.query(sql, [this.task[0].id])
        return deleted;
    }
}

module.exports = Tasks;