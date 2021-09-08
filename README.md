# PropertyManager+

This is a simple MVC app that was made with Express, Mongoose, EJS, Chart.JS and Google Auth (using Passport).

## Description

The app allows the user to create an account using the Google account and manage any number of properties that they may own. The user has the option of adding the property details, images, rental and property values as well as track them over some time. 

You can find deployed project here: https://property-manager-plus.herokuapp.com/

## Packages used

* chart.js: For plotting the rental and property value charts
* ejs: Main templating engine
* express: Main web framework 
* mongoose: Main ODM
* numeral: For number styling
* passport and passport google oauth: For authentication

## Steps to use this project:

* Do a `npm install` 
* Go to Google Developer Console to get the Client ID and Client Secret
* Go to MongoDB Atlas to set up your database
* Set up Heroku and push the app there 
    * Include relevant environment variables
