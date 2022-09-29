const mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 15,
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'mypos'
});

module.exports = connection;