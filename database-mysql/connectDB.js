var mysql = require('mysql');

let con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'converseSated'
});

con.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Connected!");
});

module.exports = con;



