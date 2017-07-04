/**
 * Created by ruslan on 24.06.2017.
 */

var CheckAuth = require('../middleware/CheckAuth');


module.exports = function (app) {

    app.get('/', CheckAuth, require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/registry', require('./registry').get);
    app.post('/registry', require('./registry').post);

    app.post('/logout', CheckAuth, require('./logout').post);

    app.get('/sudoku', CheckAuth, require('./sudoku').get);

    app.get('/astar', CheckAuth, require('./astar').get);

    app.get('/words', CheckAuth, require('./words').get);
    app.post('/words', CheckAuth, require('./words').saveWord);
    app.post('/getWords', CheckAuth, require('./words').getWords);


};