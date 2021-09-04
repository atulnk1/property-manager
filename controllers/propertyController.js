const express = require("express");
const propertyModel = require("../models/property");
const authController = require("./authController")
const controller = express.Router();

// INDEX PAGE
controller.get("/", authController.isLoggedIn, async (req, res) => {
    try {
        const properties = await propertyModel.find({});

        let totalPropertyValue = 0;
        let totalRentValue = 0;
        let totalLoanValue = 0;

        for(let property of properties){
            totalPropertyValue += Number(property.currentValue);
            totalRentValue += Number(property.rentalAmount);
            totalLoanValue += Number(property.installmentAmount);
        }
        
        res.render("property/index.ejs", {
            properties,
            totalPropertyValue,
            totalRentValue,
            totalLoanValue
        });  
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});
// GET ADD NEW PROPERTY PAGE
controller.get("/new", authController.isLoggedIn, async (req, res) => {
    try {
        res.render("property/new.ejs")
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});
// GET ONE PROPERTY ROUTE
controller.get("/:id", authController.isLoggedIn, async (req, res) => {
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
// ADD NEW PROPERTY ROUTE
controller.post("/", authController.isLoggedIn,  async (req, res) => {

    try {
        const imageList = req.body.image.split(',')
        const newHistoricalValue = req.body.historicalValue.split(',');
        const newHistoricalRentalAmount = req.body.historicalRentalAmount.split(',');
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

// UPDATE ROUTES
controller.get('/:id/edit', authController.isLoggedIn, async (req, res) => {
    try {
        const selectedProperty = await propertyModel.findById(req.params.id)
        res.render('property/edit.ejs', {
            property: selectedProperty
        })
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});

controller.put('/:id', authController.isLoggedIn, async (req, res) => {
    try {
        const imageList = req.body.image.split(',')
        const newHistoricalValue = req.body.historicalValue.split(',');
        const newHistoricalRentalAmount = req.body.historicalRentalAmount.split(',');
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
        await propertyModel.updateOne({
            _id: req.params.id,
        }, inputs);

        res.redirect(`/property/${req.params.id}`)

    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});

// RENT ROUTE
controller.patch('/:id/rent', authController.isLoggedIn, async (req, res) => {
    try {
        const updateProperty = await propertyModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: { historicalRentalAmount: Number(req.body.rent) },
                rentalAmount: Number(req.body.rent)
            },
            {
                new: true
            }
        );
        if(updateProperty) {
            res.redirect(`/property/${req.params.id}`);
        } else {
            throw new Error('Unable to update currently. Please try again later.')
        }

    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});


// INSTALLMENT ROUTE
controller.patch('/:id/loan', authController.isLoggedIn, async (req, res) => {
    try {
        const currProperty = await propertyModel.findById(req.params.id);

        if(currProperty.loanLeft < 1) {
            res.redirect(`/property/${req.params.id}`)
        } else {
            const loanPaid = - Number(req.body.installment)
            const updateProperty = await propertyModel.findByIdAndUpdate(
                req.params.id,
                {
                    $inc: {
                        loanLeft: loanPaid
                    },
                    installmentAmount: req.body.installment
                },
                {
                    new: true
                }
            );
            if(updateProperty) {
                res.redirect(`/property/${req.params.id}`);
            } else {
                throw new Error('Unable to update currently. Please try again later.')
            }
        }
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});

// PROPERTY VALUE ROUTE
controller.patch('/:id/value', authController.isLoggedIn, async (req, res) => {
    try {
        const updateProperty = await propertyModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: { historicalValue: Number(req.body.value) },
                currentValue: Number(req.body.value)
            },
            {
                new: true
            }
        );
        if(updateProperty) {
            res.redirect(`/property/${req.params.id}`);
        } else {
            throw new Error('Unable to update currently. Please try again later.')
        }

    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
});

// DELETE ROUTE
controller.delete('/:id', authController.isLoggedIn, async (req, res) => {
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