
//var User = require('../database/User');

exports.get =  function(req, res) {
  res.render('index', { title: 'Express', user:  req.session.user });
};


