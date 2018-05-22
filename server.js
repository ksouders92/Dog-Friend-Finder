// dependencies 
// TODO: 
// 1. get CSS file to import 
// import './app/CSS/style.css';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8081;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

// Requires path to htmlRoutes.js
require('./app/routing/apiRoutes.js')(app);
// Sends (app) to module.exports function
// Requires path to htmlRoutes.js
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function (){
    console.log("App listening on PORT: " + PORT);
})