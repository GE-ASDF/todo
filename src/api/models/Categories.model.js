const { extractDataFromObject } = require("../../../utils/utils");
const Model = require("../core/Model");
const categories_database = require("../database/categories.js")

class Categories extends Model{
    #categories;
    #categoriesKeys = [...Object.keys(categories_database.category)]
    constructor(table){
        super();
        this.table = table ? table:Categories.name.toLowerCase();
    }
    
    setCategories(categories){
        this.#categories = categories;
        return this;
    }
    
    async create(){
        if(!this.#categories) return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#categoriesKeys.join(", ");
        for(let key in this.#categoriesKeys){
            if(!this.#categories[this.#categoriesKeys[key]]){
                return "É preciso inserir um usuário primeiro com os seguintes dados: " + this.#categoriesKeys.join(", ");
            }
        }
        let sql = `INSERT INTO ${this.table}(${[...this.#categoriesKeys]}) VALUES(`;
        sql += '?,'.repeat(this.#categoriesKeys.length);
        sql = sql.slice(0, sql.length -1) + ")";
        const data = extractDataFromObject(this.#categories); 
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
        const [categories] = await con.query(sql,data);
        this.categories = categories;
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

module.exports = Categories;