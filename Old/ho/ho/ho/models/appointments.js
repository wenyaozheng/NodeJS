var db = require('../db');
/**
 * Created by Dell on 5/15/2017.
 */

exports.create = function (user, done) {
    db.get().query("INSERT INTO customers SET ?", user, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });

};