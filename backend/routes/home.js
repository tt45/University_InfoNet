var secrets = require('../config/secrets');

module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ 
            message: 'My connection string is ' + connectionString,
            data: "Welcome to UniInfoNet Backend hosted on Heroku and Developed by 4 Students at UIUC for the course CS498RK"
        });
    });
    return router;
}
