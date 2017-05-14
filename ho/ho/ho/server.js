
var express = require("express");
var router = express.Router();
// var path = __dirname + '/views/';
var path = require("path");
var ejs = require("ejs");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// router.use(function (req,res,next) {
//     console.log("/" + req.method);
//     next();
// });
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'finalproject'
});


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});


app.set('port', (process.env.PORT || 3000));



app.listen(3000,function(){
    console.log("Connected at Port 3000");
});


