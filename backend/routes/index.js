/*
 * Connect all of your endpoints together here.
 */

module.exports = function (app, router) {
    app.use('/', require('./home.js')(router));
    app.use('/users', require('./users.js'));
    app.use('/posts', require('./posts.js'));
    app.use('/comments', require('./comments.js'));

    app.use((req, res, next) => {
        const error = new Error('404 Not found');
        error.status = 404;
        next(error);
    });
    
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: error.message,
            test: "haha"
        });
    });
};
