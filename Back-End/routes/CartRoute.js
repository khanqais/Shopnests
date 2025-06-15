const express=require('express')
const { addToCart,updateCart,getUserCart,} =require('../controllers/CartControllers')
const authUser=require('../middleware/auth')
const CartRoute=express.Router();

CartRoute.post('/get',authUser,getUserCart)
CartRoute.post('/add',authUser,addToCart)
CartRoute.post('/update',authUser,updateCart)

module.exports=CartRoute

