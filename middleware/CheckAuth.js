/**
 * Created by ruslan on 25.06.2017.
 */

var HttpError = require('../errors/HttpError');

module.exports = function(req, res, next) {
    if(!req.session.user) {
        // return next(new HttpError(401, 'вы не авторизированы'));
        res.render('login');
    } else {
        next();
    }
};