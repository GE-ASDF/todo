const { matchedData } = require("express-validator");
const Categories = require("../models/Categories.model");
const { emptyData } = require("../constants/Users");

module.exports = {
    async All(req, res){
        const select = await new Categories().all();
        return res.json(select.categories)
    },
    async Create(req, res){
        const data = matchedData(req);
        const http = new Categories();
        const insert = await http.setCategories(data).create();
        return res.json(insert);
    }
}