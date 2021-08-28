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

controller.get("/new", async (req, res) => {
    try {
        res.render("property/new.ejs")
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
});

controller.post("/", async (req, res) => {
    const imageList = req.body.image.split(',')
    const newHistoricalValue = req.body.historicalValue.split(',');
    const newHistoricalRentalAmount = req.body.historicalRentalAmount.split(',');

    try {
        inputs = {
            name: req.body.name,
            unit: req.body.unit,
            street: req.body.street,
            postalCode: req.body.postalCode,
            district: req.body.district,
            image: imageList,
            googleMapLink: req.body.googleMapLink,
            propertyType: req.body.propertyType,
            purchaseValue: req.body.purchaseValue, // Amount user bought it for
            currentValue: req.body.currentValue, // Current price for property
            historicalValue: newHistoricalValue,
            rentalAmount: req.body.rentalAmount,
            historicalRentalAmount: newHistoricalRentalAmount,
            status: req.body.status,
            installmentAmount: req.body.installmentAmount,
            loanLeft: req.body.loanLeft
        }

        console.log(inputs)
        await propertyModel.create(inputs)

        res.redirect("/property")

    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    } 
});

controller.delete('/:id', async (req, res) => {
    try {
        await propertyModel.deleteOne({
            _id: req.params.id
        });   

        res.redirect("/property");
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    } 
})


module.exports = controller;