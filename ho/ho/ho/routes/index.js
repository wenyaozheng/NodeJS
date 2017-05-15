var express = require('express');
var router = express.Router();
var index = require('../routes/index');
var appointments = require('../routes/appointments');
var services = require('../routes/services');
var stylist = require('../routes/stylist');
var about = require('../routes/about');

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Salonpas' });
});

module.exports = router;
