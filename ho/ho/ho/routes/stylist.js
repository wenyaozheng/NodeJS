var express = require('express');
var router = express.Router();

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
