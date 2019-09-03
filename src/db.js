var express = require('express');
var pg = require("pg");
var app = express();
 
var connectionString = "94.231.110.64://balticrimdev:SpaceTimeCube360@localhost:5432/balticrim";
 
app.get('/', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM metadata where id = $1', [1],function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});
 
app.listen(4000, function () {
    console.log('Server is running.. on Port 4000')});