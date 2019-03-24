var loggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({loggedIn: false});
}

module.exports = loggedIn;