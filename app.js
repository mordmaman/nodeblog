var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.send("home page");
})

//server 
app.listen(3000, function(){
    console.log('Listening on port 3000!');
})