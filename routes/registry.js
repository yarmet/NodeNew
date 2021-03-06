/**
 * Created by ruslan on 25.06.2017.
 */
var User = require('../database/DbUser');
var HttpError = require('../errors/HttpError');

exports.get = function (req, res) {
    res.render('registry', {title: 'Express', user: 'ruslan'});
};

exports.post = function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    var repeatPassword = req.body.repeat_password;

    var reg = /[^A-Z-a-z-0-9]/g;

    if (username.length < 3 || username.length > 15) {
        return res.status(403).json({description: "логин должен быть длинной от 3 до 15 символов"});
    } else if (password.length < 3 || password.length > 15) {
        return res.status(403).json({description: "пароль должен быть длинной от 3 до 15 символов"});
    } else if (reg.test(username)) {
        return res.status(403).json({description: "логин должен состоять из английских букв, цифр и без пробелов"});
    } else if (reg.test(password)) {
        return res.status(403).json({description: "пароль должен состоять из английских букв, цифр и без пробелов"});
    }

    User.findOne({username: username}, function (err, user) {
        if (err)  return next(err);

        if (user) {
            return res.status(403).json({"description": "такой пользователь уже есть"});
        } else {
            var user = new User({username: username, password: password});
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                req.session.user = user.username;
                return res.status(200).json({"description": "ok"});
            })
        }
    });
};