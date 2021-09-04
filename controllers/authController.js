const express = require("express");
const propertyModel = require("../models/property");
const passport = require("passport");
const controller = express.Router();

const isLoggedIn = (req, res, next) => {
    // req.user ? next() : res.sendStatus(403)
    if (req.user) {
        res.locals.firstName = req.user.name;
        res.locals.email = req.user.email;
        next();
    } else {
        res.sendStatus(401)
    }
}

const isLoggedInHomepage = (req, res, next) => {
    // req.user ? next() : res.sendStatus(403)
    if (req.user) {
        res.locals.firstName = req.user.name;
        res.locals.email = req.user.email;
    } else {
        res.locals.email = 'not defined';
    }
    next();
}

controller.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

controller.get('/google/callback', 
  passport.authenticate('google', { successRedirect: '/property', failureRedirect: '/auth/google/failure' }));

controller.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate with Google');
});

controller.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/')
})

module.exports = {
    isLoggedIn: isLoggedIn,
    isLoggedInHomepage: isLoggedInHomepage,
    controller: controller
}

// module.exports = controller