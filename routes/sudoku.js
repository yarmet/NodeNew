/**
 * Created by ruslan on 25.06.2017.
 */


exports.get = function (req, res) {
    res.render('sudoku', { title: 'Express', user:  req.session.user });
};
