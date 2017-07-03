/**
 * Created by ruslan on 03.07.2017.
 */

var mongoose = require('./');

var schema = mongoose.Schema({
    russian: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Word', schema);