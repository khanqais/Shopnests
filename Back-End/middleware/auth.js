const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  try {
    // Get token from headers (check both 'token' and 'authorization')
    const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Debug: Log the decoded token to see what's inside
    console.log("Decoded token:", decoded);
    
    // Extract user ID (check common JWT payload properties)
    const userId = decoded.id || decoded.userId || decoded._id || decoded.user?.id;
    
    if (!userId) {
      return res.json({ 
        success: false, 
        message: "Invalid token: No user ID found" 
      });
    }

    // Add userId to request body
    req.body.userId = userId;
    
    // Debug: Log the userId being set
    console.log("Setting userId in request:", userId);
    
    // Proceed to next middleware/route handler
    next();
    
  } catch (error) {
    console.log("Auth error:", error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.json({ 
        success: false, 
        message: "Invalid token" 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.json({ 
        success: false, 
        message: "Token expired" 
      });
    } else {
      return res.json({ 
        success: false, 
        message: "Authentication failed" 
      });
    }
  }
};

module.exports = authUser;