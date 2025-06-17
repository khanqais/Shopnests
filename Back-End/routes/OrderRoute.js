const {placeorder,
    placeorderRazorpay,
    placeorderStripe,
    allorder,
    UserOrders,
    UpdateStatus}=require('../controllers/OrderController')

const AdminAuth=require('../middleware/AdminAuth')
const authUser=require('../middleware/auth')

const express=require('express')

const OrderRoute=express.Router();

// OrderRoute.post('/list',AdminAuth,)
OrderRoute.post('/status',AdminAuth,UpdateStatus)

//Payment Features
OrderRoute.post('/place',authUser,placeorder)
OrderRoute.post('/stripe',authUser,placeorderStripe)
OrderRoute.post('/razorpay',authUser,placeorderRazorpay)

//User Feature
OrderRoute.post('/userorders',authUser,allorder)

module.exports=OrderRoute

 
