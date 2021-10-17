var express = require('express');
var app = express();

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});

// used to serve static files from public directory
app.use(express.static('public'));

// test with curl 'http://localhost:3000/add?firstName=peter'
app.get('/', function(req, res){
    res.send('hello');
});

app.get('/add', function(req, res){
    connection.query(
        `INSERT  INTO \`contacts\` VALUES('${req.query.firstName}','${req.query.lastName}','${req.query.PhoneNumber}'
        ,'${req.query.Email}','${req.query.University}','${req.query.Major}')`,
        function(err, results, fields) {
          console.log(results);
          res.send(results);
        }
      );

});


app.get('/read', function(req, res){

    connection.query(
      'SELECT * FROM `contacts`',
      function(err, results, fields) {
        console.log(results);
        res.send(results);
      }
    );
 
 });
 
app.listen(3000,function(){
    console.log('running on port 3000');
});