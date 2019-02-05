var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

//var urlencodedParser = bodyParser.urlencoded({ extended: false })

passport.use(new Strategy(
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
  ));
  
var app = express();
app.set('view engine', 'ejs');
app.use('/assets/css', express.static(__dirname + '/public/styles'));
// Initialize passport app
app.use(passport.initialize());
app.use(passport.session());

function passportAuthenticate(){
    console.log('In passport Authenticate function');
    debugger;
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
}

// Authenticate using req.body 
// If authenticate move on to todopage 
// Connect to database to get todos and pass it to view 
app.post('/login', 
  passportAuthenticate,
  function(req, res) {
    console.log('Login Handler');
    res.render('/');
  });


app.get('/', function(req, res){
    res.render('login');
})

app.listen(3000);
