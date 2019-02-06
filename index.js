var passportMod = require('./utils/passport');
var users = require('./db/users');
var setup = require('./setup');
var routes = require('./routes/routes');

// Initial Setup for express, middleware
var app = setup();

// Set up authentication for passport module 
passportMod(app, users);

// Define routes.
app.use('/', routes);

app.listen(process.env.port || 3000);