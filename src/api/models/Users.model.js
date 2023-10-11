const { extractDataFromObject } = require("../../../utils/utils");
const Model = require("../core/Model");
const users_database = require("../database/user");
class Users extends Model{
    #users;
    #usersKeys = [...Object.keys(users_database.user)]
    constructor(table){
        super();
        this.table = table ? table:Users.name.toLowerCase();
    }
    
    setUsers(users){
        this.#users = users;
        return this;
    }
    
    async create(){
        if(!this.#users) return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#usersKeys.join(", ");
        for(let key in this.#usersKeys){
            if(!this.#users[this.#usersKeys[key]]){
                return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#usersKeys.join(", ");
            }
        }
        let sql = `INSERT INTO ${this.table}(${[...this.#usersKeys]}) VALUES(`;
        sql += '?,'.repeat(this.#usersKeys.length);
        sql = sql.slice(0, sql.length -1) + ")";
        const data = extractDataFromObject(this.#users); 
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
        const [users] = await con.query(sql,data);
        this.users = users;
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
        const [user] = await con.query(sql,data);
        this.user = user;
        return this;
    }
}

module.exports = Users;