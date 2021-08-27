const express = require("express");
const propertyModel = require("../models/property");
const controller = express.Router();

controller.get("/", async (req, res) => {
    res.render("landingpage/landing.ejs")
});

module.exports = controller;