/**
 * Created by ruslan on 25.06.2017.
 */



exports.post = function (req, res, next) {

    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};