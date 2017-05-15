var express = require('express');
var router = express.Router();

/* GET transaction page. */

router.get('/list', function (req, res, next) {
    transactions.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('transactions/list', {
            'results': results
        });
    });
});

module.exports = router;
