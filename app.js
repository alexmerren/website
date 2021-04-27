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

// Render the homepage upon visiting
app.get('/', function(req, res) {
    res.render('index');
});

// Render the index for sorting
app.get('/robots.txt', function(req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// Render the index for sorting
app.get('/sorting', function(req, res) {
    res.render('sorting/index');
});

// When a request is made to 'www.website.com/page' it redirects to page/index 
//app.use('/', function(req, res) {
//    var reqUrl = url.parse(req.url, true).pathname;
//    var pathname = '.' + reqUrl + '/index';
//    res.render(pathname);
//});
