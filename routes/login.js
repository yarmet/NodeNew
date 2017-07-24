/**
 * Created by ruslan on 25.06.2017.
 */

var User = require('../database/DbUser');
var HttpError = require('../errors/HttpError');

exports.get = function (req, res) {
    res.render('login');
};

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var remember = req.body.remember;


    User.findOne({username: username}, function (err, user) {
        if (err)  return next(err);
        if (user && user.checkpassword(password)) {
            req.session.user = user.username;
            if (remember === true) {
                req.session.cookie.maxAge = 604800000; // one week
            }
            res.sendStatus(200)
        } else {
             next(new HttpError(403, 'пароль должен состоять из английских букв, цифр и без пробелов '));
        }
    });
};