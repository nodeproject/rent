var promise = require('bluebird');
var pgp     = require('pg-promise')(options);

var cn = {
  host: 'localhost',
  port: 5432,
  database: 'rentdb',
  user: 'araud',
  password: 'root'
}

var options = {
  // Initialization Options
  promiseLib: promise
};

var db = pgp(cn);

module.exports = {
  db: db,
  'secret': 'pliksplaks'
};