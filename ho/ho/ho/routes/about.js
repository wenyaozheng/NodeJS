var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

module.exports = router;
