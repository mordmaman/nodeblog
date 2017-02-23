var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/node_blog");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: String,
    content: String
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//     {
//         title: "Welcome",
//         image: "http://www.desicomments.com/wp-content/uploads/Welcome-Simple-Greeting-Image-P8820dc07-600x497.jpg",
//         date: "15/02/2017",
//         content: "Welcome to my blog"
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
            console.log(allBlogs[0].content.substring(0,3));
            res.render("index", {blogs: allBlogs});
        }
    })
})

app.post('/blogs', function (req, res){
    //get data from form and add to blogs
    var title = req.body.title;
    var date = req.body.date;
    var image = req.body.image;
    var content = req.body.content;
    
    console.log(req.body);
    var newBlog = {title: title, date: date, image: image, content: content}
    //create blog and add to mongodb
    Blog.create(newBlog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
})

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