var express = require('express');
var print = require('print');
var router = express.Router();
var connection = require('../server');
var obj = {};

    /* GET appointments page. */

    router.get('/appointments', function (req, res, next) {
        connection.query('SELECT * FROM services', function(err, result) {
            if(err){
                throw err;
            } else {
                res.render('appointments', {
                    'results': result
                });
            }
        });
    });

module.exports = router;