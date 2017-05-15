var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');
/* GET stylist page. */

// router.get('/stylist', function(req, res, next) {
//     res.render('stylist', { title: 'Stylist' });
// });
router.get('/list', function (req, res, next) {
    stylist.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('stylist/list', {
            'results': results
        });
    });
});

module.exports = router;
