var express = require('express');
var passport = require('passport');

module.exports = function(){
    var app = express();

    // Configure view engine to render EJS templates.
    app.set('view engine', 'ejs');
    app.use('/assets/css', express.static(__dirname + '/public/styles'));

    return app;
}

