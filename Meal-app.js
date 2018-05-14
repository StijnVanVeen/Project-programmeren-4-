const express = require('express');

// Create the application
const app = express();

app.all('*', function(req, res, next){
    console.log( req.method + " " + req.url);
    next();
});

// Routing with versions
app.use('/', require('./routes/Login'));

// Start the server
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('The magic happens at http://localhost:' + port);
});

module.exports = app;