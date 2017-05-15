
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static(__dirname + '/view'));
app.engine('ejs', require('express-ejs-extend'));
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

var index = require('./routes/index');
var appointments = require('./routes/appointments');
var services = require('./routes/services');
var stylist = require('./routes/stylist');
var about = require('./routes/about');
var transactions = require('./routes/transactions');
var visits = require('./routes/visits');

app.use('/', index);
app.use('/about', about);
app.use('/appointments', appointments);
app.use('/services', services);
app.use('/stylist', stylist);
app.use('/transactions', transactions);
app.use('/visits', visits);


app.set('port', (process.env.PORT || 3000));



app.listen(3000,function(){
    console.log("Connected at Port 3000");
});


