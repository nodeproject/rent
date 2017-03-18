var jwt     = require('jsonwebtoken');
var config  = require('../config');
var db      = require('../db');

// Query Functions
function getAllData(req, res, next) {
  db.any('SELECT * FROM test')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all data from rentdb'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleData(req, res, next) {
  var id = parseInt(req.params.id);
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  db.one('SELECT * FROM test WHERE id = $1', id)
    .then(function (data) {
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            res.status(200)
              .json({
                status: 'success',
                data: data,
                message: 'Retrieved one data'
              });
          }
        });
      } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

function createData(req, res, next) {
  req.body.launched = parseInt(req.body.launched);
  db.none('INSERT INTO test(name, likes, description) values(${name}, ${likes}, ${description})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one data'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateData(req, res, next) {
  db.none('UPDATE test SET name=$1, likes=$2, description=$3 where id=$4',
    [req.body.name, parseInt(req.body.likes), req.body.description, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated data'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeData(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM test WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} from rentdb'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
    getAllData: getAllData,
    getSingleData: getSingleData,
    createData: createData,
    updateData: updateData,
    removeData: removeData
};