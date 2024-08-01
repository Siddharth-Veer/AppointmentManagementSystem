// backend/middleware/auth.js
function auth(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.status(401).send('Access denied. No token provided.');
    }
    next();
}

module.exports = auth;
