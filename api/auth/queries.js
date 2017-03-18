var jwt     = require('jsonwebtoken');
var config  = require('../config');
var db      = require('../db');

// find the user
function findUser(req, res, next) {
  db.one('SELECT * FROM users WHERE name = $1 AND password = $2', [req.body.name, req.body.password])
    .then(function (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var userData = { id: user.id, name: user.name, email: user.mail };
        var token = jwt.sign(userData, config.secret);

        // return the information including token as JSON
        res.json({
          token: token
        });
      }
    }, function() {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  findUser: findUser
};