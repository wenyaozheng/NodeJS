// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Salonpas' });
// });


var express = require("express");
var router = express.Router();
// var path = __dirname + '/views/';
var path = require("path");
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
    database : 'customer'
});


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});
//
// connection.query('SELECT * from customer', function(err, rows, fields) {
//
//     if (!err)
//         console.log(rows[0]);
//     else
//         console.log('Error while performing Query.');
//
// });
// connection.end();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/view'));
router.get("/",function(req,res){
    res.sendFile(__dirname + "/views/index.html");
});

router.get("/about",function(req,res){
    res.sendFile(__dirname + "/views/about.html");
});

router.get("/services",function(req,res){
    res.sendFile(__dirname + "/views/services.html");
});
router.get("/stylist",function(req,res){
    res.sendFile(__dirname + "/views/stylist.html");
});

app.use("/",router);


// app.use("*",function(req,res){
//     res.sendFile(__dirname + "/views/404.html");
// });

app.listen(3000,function(){
    console.log("Connected at Port 3000");
});


