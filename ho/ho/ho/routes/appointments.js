var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');

/* GET appointments page. */
router.get('/appointments', function(req, res, next) {
    res.render('appointments', { title: 'Appointments' });
});

module.exports = router;
