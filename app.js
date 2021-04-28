const express = require('express');
const url = require('url');
const app = express();
const PORT = 80;

// Set the images/stylesheets to be in /static
app.use(express.static(__dirname + '/static'));

// Tell the server to render ejs files
app.set('trust proxy', true);
app.set('view engine', 'ejs');

// Opens up the server to the port specified above 
app.listen(PORT, function () {
    console.log(`An app listening on port ${PORT}`);
});

// Function to send homepage when request is made.
app.get('/', function(req, res) {
    res.render('index');
});

// Function to send the sorting visualiser page when request is made.
app.get('/sorting', function(req, res) {
    res.render('sorting/index');
});

// Function to send the robots.txt (for Google) when requested.
app.get('/robots.txt', function(req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /\nSitemap: http://alexmerren.uk/sitemap.xml");
});

// Function to send the sitemap (used for SEO) when requested
app.get('/sitemap.xml', function(req, res) {
    res.setHeader('Content-Type', 'application/xml');
    res.type('text/xml');
    res.sendFile(__dirname + '/views/sitemap.xml');
});
