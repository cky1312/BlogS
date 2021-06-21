
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut nulla magnam obcaecati sequi adipisci provident iusto ea! Molestiae eos laudantium vitae nesciunt! Sed animi atque saepe esse, quis nesciunt placeat";

const aboutContent = " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam asperiores ea voluptas accusamus consectetur, quibusdam odit illum hic nemo repudiandae voluptate, quas esse quam voluptatum fugiat nulla culpa sint amet! ";

const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci in eos maiores quae aut et odit veritatis assumenda, culpa, veniam nam ex perferendis vero facere! Provident facere incidunt ullam magnam. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
    });
});


app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent });
});


app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});