var print = require("print");
var express = require("express");
var dateTime = require('node-datetime');
var router = express.Router();
// var path = __dirname + '/views/';
var path = require("path");
var ejs = require("ejs");
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
// app.use(session({secret: 'keyboard cat', cookie:{maxAge: 60000}}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/view'));
app.engine('ejs', require('express-ejs-extend'));
// router.use(function (req,res,next) {
//     console.log("/" + req.method);
//     next();
// });
// dynamically include routes (Controller)
// fs.readdirSync('./controllers').forEach(function (file) {
//     if(file.substr(-3) == '.js') {
//         route = require('./controllers/' + file);
//         route.controller(app);
//     }
// });
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '192.168.0.115',
    user: 'dbuser',
    password: '1',
    database: 'salon'
});


connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});
//
// var index = require('./routes/index');
// var appointments = require('./routes/appointments');
// var services = require('./routes/services');
// var stylist = require('./routes/stylist');
// var transactions = require('./routes/transactions');
// var visits = require('./routes/visits');
// var logout = require('./routes/logout');

var id = 1;
app.use('/home', function (req, res) {
    // id = req.query.id;
    res.render('index');
});
// app.use('/about', about);
// app.use('/appointments', appointments);
// app.use('/services', services);
// app.use('/stylist', stylist);
// app.use('/transactions', transactions);
// app.use('/visits', visits);

app.use('/appointments', function (req, res) {
    connection.query('SELECT * FROM service_providers', function (err, result) {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM services', function (err, service) {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    console.log(service);
                    res.render('appointments', {
                        'results': result,
                        'services': service
                    });
                }
            });
        }
    });

});
var current = 0;
app.post('/makeAppointment', function (req, res) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    console.log(formatted);
    var sp = req.body.id;
    console.log(id);
    connection.query('INSERT INTO service_requests (`status`, `date_requested`, `customer_id`, `sp_id`) VALUES ( "pending", "' + formatted + '", ' + id + ', ' + sp + ');', function (err, request) {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM visits where reqId = '+request.insertId, function (err, visits) {
                if (err) {
                    throw err;
                } else {
                    current=request.insertId;
                    res.render('visit', {
                        "sp": sp,
                        'visits': visits,
                        "requestid":request.insertId
                    });
                }
            });
        }
    });

});

app.post('/markDone', function (req, res) {
    var done = req.body.accept;
    console.log(done);
    connection.query('UPDATE `salon`.`transactions` SET `status`="finished" WHERE `id`=' + done + ';', function (err, service) {
        if (err) {
            throw err;
        } else {
            res.render('index');
        }
    });

});

app.post('/cancel', function (req, res) {
    var cancelled = req.body.cancel;
    connection.query('UPDATE `salon`.`transactions` SET `status`="cancelled" WHERE `id`=' + cancelled + ';', function (err, service) {
        if (err) {
            throw err;
        } else {
            res.render('index');
        }
    });

});

app.post('/addVisits', function (req, res) {
    var requestid = req.body.reqid;
    var sp=req.body.sp;
    console.log(sp);
    console.log(sp);
    console.log(sp);
    console.log(sp);
    connection.query('SELECT * FROM services where spid ="'+sp+'" ;', function (err, services) {
        if (err) {
            throw err;
        } else {
            res.render('schedule', {
                "services": services,
                "requestid":requestid,
                "sp":sp
            });
        }
    });


});

app.post('/addVisit', function (req, res) {
    var sp = req.body.id;
    var date = req.body.date;
    var time = req.body.time;
    var service = req.body.service;
    var description = req.body.description;
    var reqID=req.body.reqid;
    console.log(sp);
    console.log(date);
    console.log(time);
    console.log(service);
    console.log(reqID);
    console.log(current);

    connection.query('INSERT INTO visits (`description`, `scheduled_date`, `time`, `reqId`,`serviceId`) VALUES ( "' + description + '", "' + date + '", "' + time + '", ' + reqID + ', ' + service + ');', function (err, service) {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM visits where reqId = '+current+';', function (err, visits) {
                if (err) {
                    throw err;
                } else {
                    res.render('visit', {
                        "sp": sp,
                        'visits': visits,
                        "requestid": current
                    });
                }
            });
        }
    });
});

app.use('/services', function (req, res) {
    connection.query('SELECT * FROM services', function (err, services) {
        if (err) {
            throw err;
        } else {
            res.render('services', {
                'services': services
            });
        }
    });
});


// app.use('/services', function(req, res){
//     res.render('services');
// });
app.use('/stylist', function (req, res) {
    connection.query('SELECT * FROM service_providers', function (err, sps) {
        if (err) {
            throw err;
        } else {
            res.render('stylist', {
                'sps': sps
            });
        }
    });
});
app.use('/profile', function (req, res) {
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    connection.query('SELECT * FROM customers WHERE id = "' + id + '" ;', function (err, cust) {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM transactions INNER JOIN service_requests on transactions.request_id = service_requests.id where customer_id = "' + id + '";', function (err, trans) {
                if (err) {
                    throw err;
                } else {
                    connection.query('SELECT * FROM service_requests WHERE customer_id = "' + id + '";', function (err, requests) {
                        if (err) {
                            throw err;
                        } else {
                            res.render('profile', {
                                'cust': cust,
                                'trans': trans,
                                'requests': requests
                            });
                            console.log(cust);
                        }
                    });
                }
            });
        }
    });
});
app.use('/visits', function (req, res) {

    res.render('visit');
});
app.use('/profile', function (req, res) {
    res.render('profile');
});


app.set('port', (process.env.PORT || 3000));


app.listen(3000, function () {
    console.log("Connected at Port 3000");
});


module.exports = connection;

