var express = require('express');
var router = express.Router();

/* GET appointments page. */
router.get('/appointments', function(req, res, next) {
    res.render('appointments', { title: 'Appointments' });
});

module.exports = router;
