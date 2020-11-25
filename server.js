const http = require('http');
const express = require('express');
const url = require('url');

const app = express();
const port = 3000;

// Set the images/stylesheets to be in /static.
app.set('view engine', 'ejs');
app.set(express.static(__dirname) + '/static');

// Function to display index.html upon visiting server. 
app.use('/', (req, res) => {
    let parsedUrl = url.parse(req.url, true);
    let pathname = 'pages' + parsedUrl.pathname;
    if ((pathname)[pathname.length - 1] === '/') {
        pathname += 'index';
    }
    res.render(pathname, parsedUrl.query);
});

// Create the server.
const server = http.createServer(app);
server.listen(port);
