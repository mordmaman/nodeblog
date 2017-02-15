var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: String,
    content: String
});

 var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.render("index");
})

//server 
app.listen(3000, function(){
    console.log('Listening on port 3000!');
})