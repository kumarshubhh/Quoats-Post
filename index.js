const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
 


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set up EJS as the view engine

// Set views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 // Debug the views path

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Sample data for posts
let posts = [
    {
        id :uuidv4(),
        username: "shubhanshu",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "mamta",
        content: "Hard work is important to achieve success!"
    },
    {
        id:uuidv4(),
        username: "shubh",
        content: "I got selected for my 1st internship!"
    },
];

// Route to render the index.ejs view and pass posts to it
app.get("/posts", (req, res) => {
    // Debugging to check posts data
    res.render("index.ejs", {posts});


});

app.get("/posts/new", (req, res) =>{
 res.render("new.ejs")
});

app.post("/posts", (req,res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id,username, content});
    res.redirect("/posts")
});

app.get("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let post =posts.find((p) =>id === p.id);
    
   
    res.render("show.ejs", { post});
  
    
});
app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post =posts.find((p) =>id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");

    
    
    

});
app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post =posts.find((p) =>id === p.id);
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req,res) =>{
    let {id} = req.params;
     posts =posts.filter((p) =>id !== p.id);
    res.redirect("/posts");

});


// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});