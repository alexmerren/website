const express = require('express');
const url = require('url');
const app = express();
const port = 8080;

// Set the images/stylesheets to be in /static.
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('trust proxy', true);

// Opens up the server to port 8080.
app.listen(port, function () {
    console.log('An app listening on port 8080');
});

// Whenever a request is made to the server, it 
// responds with trying to find that url + /index.
app.use('/', function(req, res) {
    var reqUrl = url.parse(req.url, true).pathname;
    var pathname = '.' + reqUrl + '/index';
    res.render(pathname);
});