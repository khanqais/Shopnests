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

    let cartData = userData.cartData || {};

    
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

    // Update user's cart in database
    await Usermodels.findByIdAndUpdate(userId, { cartData });
    
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
    
    // Validate required fields
    if (!userId || !itemId || !size || quantity === undefined) {
      return res.json({ 
        success: false, 
        message: "Missing required fields: userId, itemId, size, or quantity" 
      });
    }

    // Find user and check if exists
    const userData = await Usermodels.findById(userId);
    if (!userData) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {};

    // Update cart logic
    if (quantity <= 0) {
      // Remove item from cart
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        // If no sizes left for this item, remove the item entirely
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Add or update quantity
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    // Update user's cart in database
    await Usermodels.findByIdAndUpdate(userId, { cartData });
    
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
    
    // Validate userId
    if (!userId) {
      return res.json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Find user and check if exists
    const userData = await Usermodels.findById(userId);
    if (!userData) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Return cart data (empty object if no cart data exists)
    const cartData = userData.cartData || {};
    
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