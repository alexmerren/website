const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");

// Create two server, one http and another https.
const app = express();

// Set the images/stylesheets to be in /static
app.use(express.static(__dirname + "/static"));

// Tell the server to render ejs files
app.set("trust proxy", true);
app.set("view engine", "ejs");

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
    res.status(200).sendFile(__dirname + "/views/robots.txt");
});

// Function to send the sitemap (used for SEO) when requested
app.get("/sitemap.xml", function (req, res) {
    res.status(200).sendFile(__dirname + "/views/sitemap.xml");
});

// Function to send 404 responses for inaccurate requests.
app.use(function (req, res) {
    res.status(404).send('404')
});

if (process.argv[2] != '-t') {
    // Get the relevant information from the files so that https can be achieved.
    const privateKey = fs.readFileSync("", "UTF-8");
    const certificate = fs.readFileSync("", "UTF-8");
    const ca = fs.readFileSync("", "UTF-8");

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
    };

    // If there is a https connection available, then redirect.
    app.use((req, res, next) => {
        req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
    });

    // Create http server and listen on port 80.
    const httpServer = http.createServer(app);
    httpServer.listen(80, () => {
        console.log("HTTP server running on port 80");
    });

    // Create https server and listen on port 443, using credentials from above.
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443, () => {
        console.log("HTTP server running on port 443");
    });
} else {
    app.listen(8080, () => {
        console.log("An app listening on port 8080");
    });
}


