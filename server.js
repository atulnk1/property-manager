require('dotenv').config();

const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Setting up Database connection
const mongoURI = process.env.MONGO_URI;
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("Database Connected Successfully"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

// Other Middleware Setup
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// TO FILL WITH SESSION CODE INFORMATION


// Linking to the controllers





// Listening on port number and ending the process
const server = app.listen(process.env.PORT);

process.on("SIGTERM", () => {
  console.log("Closing DB connection");
  server.close(() => {
    dbConnection.close();
  });
});