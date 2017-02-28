var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/node_blog");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: String,
    body: String
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//     {
//         title: "Welcome",
//         image: "http://www.desicomments.com/wp-content/uploads/Welcome-Simple-Greeting-Image-P8820dc07-600x497.jpg",
//         date: "15/02/2017",
//         body: "Welcome to my blog"
//     }, function (err, blog){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("New Blog");
//             console.log(blog);
//         }
//     }
// )

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        } else {
            //console.log(allBlogs[0].content.substring(0,3));
            res.render("index", {blogs: allBlogs});
        }
    })
})

app.post('/blogs', function (req, res){
    //create blog and add to mongodb
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
})

//show route

app.get("/blogs/:id", function (req, res){
    res.send("show page");
});
app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs/new", function(req, res){
    res.render("new");
})

//server 
app.listen(3000, function(){
    console.log('Listening on port 3000!');
})