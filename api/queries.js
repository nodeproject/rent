var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'rentdb',
    user: 'postgres',
    password: 'root'
};

var db = pgp(cn);


/////////////////////
// Query Functions
/////////////////////

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
      console.log(err)
      return next(err);
    });
}

function getSingleData(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM test WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one data'
        });
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


/////////////
// Exports
/////////////

module.exports = {
    getAllData: getAllData,
    getSingleData: getSingleData,
    createData: createData,
    updateData: updateData,
    removeData: removeData
};