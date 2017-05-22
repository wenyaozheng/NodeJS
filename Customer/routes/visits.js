var express = require('express');
var router = express.Router();

/* GET stylist page. */

router.get('/list', function (req, res, next) {
    visits.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('visits/list', {
            'results': results
        });
    });
});

module.exports = router;
