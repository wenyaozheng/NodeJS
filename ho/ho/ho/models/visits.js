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
    var q = "SELECT visitid as 'ID', description AS 'Description', scheduled_date  as 'Scheduled Date', transaction.id AS 'Transaction ID', status as 'STATUS,' FROM `service_request` NATURAL JOIN `categories` ORDER BY DATE LIMIT ?;";
    db.get().query(q, [limit],
        function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        }
    )
    ;
};
