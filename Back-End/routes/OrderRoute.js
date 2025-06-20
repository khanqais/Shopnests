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

OrderRoute.post('/list',AdminAuth,allorder)

//Payment Features
OrderRoute.post('/place',authUser,placeorder)


//User Feature
OrderRoute.post('/userorders',authUser,UserOrders)

module.exports=OrderRoute

 
