var Sequelize = require('sequelize');

// Or you can simply use a connection uri
var db = new Sequelize('postgres://araud:root@localhost:5432/rentdb');

module.exports = db;