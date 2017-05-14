var db = require('../db');

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
