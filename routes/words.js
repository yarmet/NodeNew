var Words = require('../database/DbWords');

exports.get = function (req, res) {
    res.render('words');
};


exports.saveWord = function (req, res, next) {
    var word = new Words({russian: req.body.russian, english: req.body.english});
    word.save(function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
};

exports.getWords = function (req, res, next) {
    Words.find({}, function(err, users) {
        res.json(users);
    })
};