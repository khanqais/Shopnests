const Usermodels = require("../models/Usermodels.js");

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    if (!userId || !itemId || !size) {
      return res.json({ 
        success: false, 
        message: "Missing required fields: userId, itemId, or size" 
      });
    }

    const userData = await Usermodels.findById(userId);
    if (!userData) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    let cartData = userData.CartData || {};

    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    
    await Usermodels.findByIdAndUpdate(
      userId,
      { CartData: cartData }
    );
    
    res.json({ 
      success: true, 
      message: "Added to Cart",
      cartData 
    });
    
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.json({ 
      success: false, 
      message: error.message || "Failed to add item to cart" 
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    
  
    if (!userId || !itemId || !size || quantity === undefined) {
      return res.json({ 
        success: false, 
        message: "Missing required fields: userId, itemId, size, or quantity" 
      });
    }

   
    const userData = await Usermodels.findById(userId);
    if (!userData) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    let cartData = userData.CartData || {};

    
    if (quantity <= 0) {
     
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    
    await Usermodels.findByIdAndUpdate(
      userId,
      { CartData: cartData }
    );
    
    res.json({ 
      success: true, 
      message: "Cart Updated",
      cartData 
    });
    
  } catch (error) {
    console.log("Error in updateCart:", error);
    res.json({ 
      success: false, 
      message: error.message || "Failed to update cart" 
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
  
    if (!userId) {
      return res.json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    
    const userData = await Usermodels.findById(userId);
    if (!userData) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    
    const cartData = userData.CartData || {};
    
    res.json({ 
      success: true, 
      cartData 
    });
    
  } catch (error) {
    console.log("Error in getUserCart:", error);
    res.json({ 
      success: false, 
      message: error.message || "Failed to get cart data" 
    });
  }
};

module.exports = {
  addToCart,
  updateCart,
  getUserCart,
};