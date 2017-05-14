var db = require('../db');

/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (limit, done) {
    var q = "SELECT id as 'ID',CONCAT(last_name, ',', first_name) 'Service Provider Name', service.name as 'Service', contact_number AS 'Contact Number' status AS 'Status', description AS 'description' FROM `service_providers` NATURAL JOIN `services` ORDER BY id ?;";
    db.get().query(q, [limit],
        function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        }
    )
    ;
};
