// npm install
// npm init package.json
// require() and save to variable (as function) for dot notation methods
// listen for requests
// tell express to serve directories (serves only views by default)
// tell express to use ejs by default so we don't need to include extensions in res.render
// install body parser so that requests can be handled
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("lib"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var people;

// TEMPLATES
// WHEN WE WRITE EXPRESS APPS, IT'S EASIEST TO USE EJS INSTEAD OF HTML
// express automatically looks inside views
app.get("/", function(req, res) {
    res.render("index"); 
});

// just a tester post request - should really be adding this info to a database
app.post("/", function(req, res) {
    var qualifyDict = {
      "section-two": "Guaranteed Acceptance Life",
      "section-three": "Deferred Life",
      "section-four": "Deferred Elite Plans",
      "section-five": "Simplified Elite Plans, Preferred Plans, and Preferred Elite Plans"
    };
    var submittedData = req.body;
    console.log(submittedData);
    var qualification = qualifyDict[submittedData["section"]];
    var qualifyMessage = "You have qualified for " + qualification + ".";
    console.log(qualifyMessage);

    res.render("page2", { input: submittedData, message: qualifyMessage });
});

app.get("/submission", function(req, res) {
    res.render("page2", {input: req.body});
    
});

app.listen(3000, function() {
  console.log("Server running dawg");
});