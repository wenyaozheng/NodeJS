var express = require("express");
var app = express();
var router = express.Router();
var path = 'views/';

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

router.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});

router.get("/about",function(req,res){
    res.sendFile(__dirname  + '/about.html');
});

router.get("/contact",function(req,res){
    res.sendFile(__dirname  + '/contact.html');
});

app.use("/",router);

app.use("*",function(req,res){
    res.sendFile(__dirname  + '/404.html');
});

app.listen(3000,function(){
    console.log("Live at Port 3000");
});