function isLoggedIn(req, res, next) {
    if (!req.session?.id && !req.session?.username) {
        return res.redirect(`/login`);
    }
    next();
};

module.exports = isLoggedIn;