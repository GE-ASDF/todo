const { extractDataFromObject } = require("../../../utils/utils");
const Model = require("../core/Model");
const sticky_database = require("../database/sticky")

class Sticky extends Model{
    #sticky;
    #stickyKeys = [...Object.keys(sticky_database.sticky)]
    constructor(table){
        super();
        this.table = table ? table:Sticky.name.toLowerCase();
    }
    
    setSticky(sticky){
        this.#sticky = sticky;
        return this;
    }
    
    async create(){
        if(!this.#sticky) return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#stickyKeys.join(", ");
        for(let key in this.#stickyKeys){
            if(this.#stickyKeys[key] != 'description'){
                if(!this.#sticky[this.#stickyKeys[key]]){
                    return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#stickyKeys.join(", ");
                }
            }
        }
        let sql = `INSERT INTO ${this.table}(${[...this.#stickyKeys]}) VALUES(`;
        sql += '?,'.repeat(this.#stickyKeys.length);
        sql = sql.slice(0, sql.length -1) + ")";
        const data = extractDataFromObject(this.#sticky); 
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
        const [sticky] = await con.query(sql,data);
        this.sticky = sticky;
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
        const [sticky] = await con.query(sql,data);
        this.sticky = sticky;
        return this;
    }
    async delete({where = ''}){
        if(!where.trim()){
            return {error:true, message:"Não foi possível apagar o registro"}
        }
        const sql = `DELETE FROM ${this.table} WHERE ${where}`      
        const select = `SELECT * FROM ${this.table} WHERE id = ?`  
        const con = await super.connection();
        const [sticky] = await con.query(select,[this.#sticky.id]);
        if(sticky.length > 0){
            const [deleted] = await con.query(sql, [this.#sticky.id]);
            this.deleted = deleted;
            return this;
        }
        return {error:true, message:"Não foi possível apagar o registro"}
    }
}

module.exports = Sticky;