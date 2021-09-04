const express = require("express");
const propertyModel = require("../models/property");
const authController = require("./authController")
const controller = express.Router();

controller.get("/", authController.isLoggedInHomepage, async (req, res) => {
    res.render("landingpage/landing.ejs")
});

module.exports = controller;