var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');
var formatCurrency = require('format-currency');
var opts = {format: '%s%v', symbol: '₱'};

/* GET events listing. */
router.get('/list', function (req, res, next) {

    event.getAll(100000000, function (err, results) {
        // format
        results.forEach(function (val) {
            // peso sign in currency
            val.Price = formatCurrency(val.Price, opts);
            val.Date = val.Date.toLocaleDateString() + ' ' +
                val.Date.toLocaleTimeString();
        });
        res.render('services/list', {results: results});
    })
});


module.exports = router;
