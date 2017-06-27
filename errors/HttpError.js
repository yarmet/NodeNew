/**
 * Created by ruslan on 25.06.2017.
 */


module.exports = function HttpError(status, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
};

require('util').inherits(module.exports, Error);