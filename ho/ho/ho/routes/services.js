var express = require('express');
var services = require('../models/services');
var router = express.Router();
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
