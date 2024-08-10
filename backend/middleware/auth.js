// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(requiredRole) {
    return (req, res, next) => {
        const token = req.session.token;  // Use session-stored token
        if (!token) return res.status(401).send('Access denied. No token provided.');

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = decoded;

            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }

            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    };
function auth(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.status(401).send('Access denied. No token provided.');
    }
    next();
}
module.exports = auth;
