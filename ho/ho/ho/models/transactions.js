var db = require('../db');
var index = require('./routes/index');
var appointments = require('./routes/appointments');
var services = require('./routes/services');
var stylist = require('./routes/stylist');
var about = require('./routes/about');
/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (limit, done) {
    var q = "SELECT id as 'ID', status AS 'Status', date_started  as 'Date Started', date_finished AS 'Date Finished', amount as 'Amount,' FROM `transactions` ORDER BY id LIMIT ?;";
    db.get().query(q, [limit],
        function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        }
    )
    ;
};
