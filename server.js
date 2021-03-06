// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(__dirname + "/public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

var db = require("./models");

var port = process.env.PORT || 3000;

// Routes
// =============================================================
// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function(){
    app.listen(port, function(){
        console.log("Listening on port %s", port);
    });
});