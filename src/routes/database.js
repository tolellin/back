const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'mysql-tolellin.alwaysdata.net',
    user: 'tolellin_data',
    password:'24312513',
    database: 'tolellin_escleapp'
})

mysqlConnection.connect(function (err) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;