const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();

const privateKey = fs.readFileSync("", "UTF-8");
const certificate = fs.readFileSync("", "UTF-8");
const ca = fs.readFileSync("", "UTF-8");
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

// Create two server, one http and another https.
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// Set the images/stylesheets to be in /static
app.use(express.static(__dirname + "/static"));

// If there is a https connection available, then redirect.
app.use((req, res, next) => {
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
});

// Tell the server to render ejs files
app.set("trust proxy", true);
app.set("view engine", "ejs");

// Start the servers.
httpServer.listen(80, () => {
    console.log("HTTP server running on port 80");
});

httpsServer.listen(443, () => {
    console.log("HTTP server running on port 443");
});

// Opens a server at port 8080 (testing only).
app.listen(8080, function () {
    console.log("An app listening on port 8080");
});

// Function to send homepage when request is made.
app.get("/", function (req, res) {
    res.render("index");
});

// Function to send the sorting visualiser page when request is made.
app.get("/sorting", function (req, res) {
    res.render("sorting/index");
});

// Function to send the robots.txt (for Google) when requested.
app.get("/robots.txt", function (req, res) {
    res.type("text/plain");
    res.send(
        "User-agent: *\nDisallow: \nSitemap: http://alexmerren.uk/sitemap.xml"
    );
});

// Function to send the sitemap (used for SEO) when requested
app.get("/sitemap.xml", function (req, res) {
    res.setHeader("Content-Type", "application/xml");
    res.type("text/xml");
    res.sendFile(__dirname + "/views/sitemap.xml");
});
