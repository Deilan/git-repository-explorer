const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));

app.get("/", function (req, res) {
  res.render("index.hbs");
});

module.exports = app;