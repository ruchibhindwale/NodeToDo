var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var urlencodedParser = require('body-parser').urlencoded({ extended: false });
var db = require('./db');

var app = express();

// Configure view engine to render EJS templates.
app.set('view engine', 'ejs');
app.use('/assets/css', express.static(__dirname + '/public/styles'));

app.use(passport.initialize());

passport.use(new Strategy(
  function(username, password, cb) {
    console.log('Stratergy code');
    console.log(cb.toString());
    db.users.findByUsername(username, function(err, user) {
      if (err) { console.log('In err'); return cb(err); }
      if (!user) {console.log('User not there'); return cb(null, false); }
      if (user.password != password) {console.log('Password Does not match '); return cb(null, false); }
      console.log('Success');
      return cb(null, user);
    });
  }));

  /*passport.use(new Strategy(
    function(username, password, done) {
    console.log('In Strategy');
      [{username: 'jack'}, {username:'jill'}].find(function (element) {
        console.log('Username', username);
        console.log('Password', password);
        if(element.username === username) {
            return done(null, user);
        }
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        
      });
    }
  ));*/

  function passportauthenticate(req, res, next){
    
    next();
  }

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home')
  });

  app.get('/login',
  function(req, res) {
    res.render('home')
  });

  app.get('/todo',
  function(req, res) {
    res.render('todo')
  });

  var passportAuth = passport.authenticate('local', { successRedirect: '/todo',
  failureRedirect: '/login',
  failureFlash: true ,  session: false });
  
app.post('/login', 
  urlencodedParser, passportAuth,
  function(req, res) {
    console.log('to do called');
    res.render('todo');
  });
  
app.listen(3000);