const jwt = require('jsonwebtoken');  // import jwt to verify tokens

const authenticateToken = (req, res, next) => {
  // get the authorization header from the request
  const authHeader = req.headers['authorization'];
  
  // extract token from "Bearer <token>" format
  const token = authHeader && authHeader.split(' ')[1];

  // if no token found, deny access
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // attach the decoded user info to the request object
    req.user = decoded;
    
    // move on to the next function (the actual route handler)
    next();
  } catch (error) {
    // token is invalid or expired
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;  // export so other files can use it
