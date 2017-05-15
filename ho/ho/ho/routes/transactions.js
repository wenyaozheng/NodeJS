var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');
/* GET transactions page. */

router.get('/list', function (req, res, next) {
    transactions.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('transactions/list', {
            'results': results
        });
    });
});

module.exports = router;
