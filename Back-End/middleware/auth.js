const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("Decoded token:", decoded);
    
    const userId = decoded.id || decoded.userId || decoded._id || decoded.user?.id;
    
    if (!userId) {
      return res.json({ 
        success: false, 
        message: "Invalid token: No user ID found" 
      });
    }

    
    req.body.userId = userId;
    
    
    console.log("Setting userId in request:", userId);
    
    
    next();
    
  } catch (error) {
    console.log("Auth error:", error);
    
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