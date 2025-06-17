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

await UserModel.findByIdAndUpdate(userId, { cartData: {} });

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
const allorder=async(req,res)=>{

}

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

