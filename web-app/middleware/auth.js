module.exports = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated
    } else {
        res.redirect('/auth/login'); // Redirect to login page
    }
};
