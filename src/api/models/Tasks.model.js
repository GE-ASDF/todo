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
        const [category] = await con.query(sql,data);
        this.category = category;
        return this;
    }
}

module.exports = Tasks;