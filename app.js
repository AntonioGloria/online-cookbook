// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const moment = require("moment");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

// Helpers for comparing values
// Evaluates if equal
hbs.registerHelper("eq", function(a, b, options){
  return a === b ? options.fn(this) : options.inverse(this);
});

// Evaluates if not equal
hbs.registerHelper("neq", function(a, b, options){
  return a !== b ? options.fn(this) : options.inverse(this);
});

// Format date
hbs.registerHelper("date", function(date){
  return moment(date).format('MMM DD, YYYY');
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.locals.appTitle = "tast-E - Online Cookbook";

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const recipeRoutes = require("./routes/recipes.routes");
app.use("/recipes", recipeRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
