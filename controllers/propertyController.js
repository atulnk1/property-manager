const express = require("express");
const propertyModel = require("../models/property");
const controller = express.Router();

controller.get("/", async (req, res) => {
    try {
        const properties = await propertyModel.find({});
        res.render("property/index.ejs", {
            properties
        });  
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});

controller.get("/:id", async (req, res) => {
    try{
        const property = await propertyModel.findById(req.params.id)
        // console.log(property)
        res.render("property/show.ejs", {
            property
        });
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
})

module.exports = controller;