const { matchedData } = require("express-validator");
const Categories = require("../models/Categories.model");
const { emptyData } = require("../constants/Users");

module.exports = {
    async All(req, res){
        const select = await new Categories().all();
        if(select.categories.length > 0){
            return res.json(select.categories)
        }
        console.log(select)
        return res.json({error: true, message:emptyData})
    },
    async Create(req, res){
        const data = matchedData(req);
        const http = new Categories();
        const insert = await http.setCategories(data).create();
        console.log(insert)
        return res.json(insert);
    }
}