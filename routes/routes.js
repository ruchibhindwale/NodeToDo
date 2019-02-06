var passport = require('passport');
var express = require('express');
var router = express.Router();
var urlencodedParser = require('body-parser').urlencoded({ extended: false });

router.get('/',
  function(req, res, next) {
    res.render('home');
    next();
  });
  
  router.get('/todo',
    function(req, res) {
        res.render('todo');
  });

router.post('/login',
    urlencodedParser, passport.authenticate('local', { successRedirect: '/todo',
    failureRedirect: '/',
    failureFlash: true ,  session: false }),
    function(req, res) {
        console.log('to do called');
        res.render('todo');
  });

module.exports = router;
  