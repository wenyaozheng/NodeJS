var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');
/* GET visits page. */

router.get('/list', function (req, res, next) {
    customer.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('visits/list', {
            'results': results
        });
    });
});

module.exports = router;
