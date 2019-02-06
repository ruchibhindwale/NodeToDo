var passport = require('passport');
var Strategy = require('passport-local').Strategy;

module.exports = function(app, users) {
    app.use(passport.initialize());

    passport.use(new Strategy(
        function(username, password, cb) {
            users.findOne({ 'username': username }, function (err, user) {
                if (err) { console.log('Error'); return cb(err)};
                if (!user || user.password != password) {console.log('User name or password wrong'); return cb(null, false)};
                console.log('User found');
                return cb(null, user);
            });
        }));
}