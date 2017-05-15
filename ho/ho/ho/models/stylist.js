var db = require('../db');

/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (limit, done) {
    var q = "SELECT id as 'ID', name 'Name', price as 'Price', categories.name AS 'Category' FROM `service_request` NATURAL JOIN `categories` ORDER BY DATE LIMIT ?;";
    db.get().query(q, [limit],
        function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        }
    )
    ;
};
