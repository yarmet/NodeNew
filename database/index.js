/**
 * Created by ruslan on 24.06.2017.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

module.exports = mongoose;