const jwt = require("jsonwebtoken");

const secret = "mysecretsdontmess";
const expiration = "6h";

module.exports = {
  // Middleware for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allow token to be sent via req.query, req.body, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Check if token is present
    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // If token is present in the headers, extract it
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // Verify token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
      // Proceed to the next endpoint
      next();
    } catch (err) {
      console.error('Invalid token:', err.message);
      // If token is invalid or expired, clear any stored token data
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  },
  // Function to sign JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
