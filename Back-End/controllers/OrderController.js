const orderModel = require("../models/orderModel");
const Usermodels = require("../models/Usermodels");

//Using COD
const placeorder=async(req,res)=>{
    try {
const { userId, items, amount, address } = req.body;

const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "COD",
    payment: false,
    date: Date.now()
};

const newOrder = new orderModel(orderData);
await newOrder.save();

await Usermodels.findByIdAndUpdate(userId, { CartData: {} });

res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        
    }
}
const placeorderStripe=async(req,res)=>{

}

const placeorderRazorpay=async(req,res)=>{

}

//all order for admin panel
const allorder = async (req, res) => {
  try {
    const { userId } = req.body;

    
    if (!userId) {
      console.log(" userId not provided in request body");
      return res.status(400).json({ success: false, message: "userId is required" });
    }


    console.log(" Fetching orders for userId:", userId);

    
    const orders = await orderModel.find({ userId });

   
    console.log(` Found ${orders.length} order(s) for userId: ${userId}`);

    
    return res.json({ success: true, orders });

  } catch (error) {
    console.log(" Error in allorder:", error.message);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


//User Order Data for Frontend
const UserOrders=async(req,res)=>{
   
}

const UpdateStatus=async(req,res)=>{

}

module.exports={
    placeorder,
    placeorderRazorpay,
    placeorderStripe,
    allorder,
    UserOrders,
    UpdateStatus
}

