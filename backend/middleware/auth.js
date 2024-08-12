// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(requiredRoles) {
    return (req, res, next) => {
        // Debugging statement to check session contents
        console.log('Session:', req.session);

        // Retrieve token from session
        const token = req.session.token;
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = decoded;

            // Check if the user's role matches one of the required roles
            if (requiredRoles && !requiredRoles.includes(req.user.role)) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }

            // Continue to next middleware or route handler
            next();
        } catch (ex) {
            console.error('Token verification error:', ex); // Log error for debugging
            res.status(400).send('Invalid token.');
        }
    };
}

module.exports = auth;
