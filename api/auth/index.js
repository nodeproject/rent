var express = require('express');
var router = express.Router();

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