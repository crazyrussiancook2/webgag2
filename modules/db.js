const mysql =require('mysql');

//connection to local DB

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Password1!',
    database : 'tets',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) throw err;
    else {
        console.log('connected!')
    }
});

module.exports = connection;
