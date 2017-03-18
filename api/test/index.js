var express = require('express');
var router = express.Router();

router.get('/api', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'test api!'
      });
});

// Postgres queries
var db = require('./queries');

router.get('/api/test', db.getAllData);
router.get('/api/test/:id', db.getSingleData);
router.post('/api/test', db.createData);
router.put('/api/test/:id', db.updateData);
router.delete('/api/test/:id', db.removeData);

module.exports = router;