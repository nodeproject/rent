var express = require('express');
var router = express.Router();
var db     = require('../db');
var Sequelize = require('sequelize');
var Users = db.define('users', {
  name: Sequelize.STRING,
  email: Sequelize.TEXT,
  password: Sequelize.TEXT,
  uuid: Sequelize.TEXT,
  type: Sequelize.TEXT
})

// Setup social-login
var socialLoginClass = require("social-login");

// Init
var socialLogin = new socialLoginClass({
  app: router,  // ExpressJS instance
  url: 'http://localhost:8080', // Your root url
    onAuth: function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
      // This is the centralized method that is called when the user is logged in using any of the supported social site.
      // Setup once and you're done.

      Users.findOrCreate({where: {name: profile.name, uuid: profile.id, type: type}})
        .then(function(user) {
          done(null, user);
        });
  }
});

socialLogin.use({
    facebook: {
    settings: {
      clientID: "357599064296731",
      clientSecret: "bfa76c794fdbf6c0edcca32e8c25651d",
      authParameters: {
        scope: 'read_stream,manage_pages'
      }
    },
    url:  {
      auth:   "/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
      callback:   "/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
      success:  '/',                        // Where to redirect the user once he's logged in
      fail:   '/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
    }
  }
});

router.get('/', function(req, res, next) {
  res.status(200)
    .json({
      status: 'success',
      message: 'Auth api!'
    });
});

// Postgres queries
var db = require('./queries');

router.post('/auth/user', db.findUser);




module.exports = router;