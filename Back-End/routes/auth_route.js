const express=require('express')
const app=express();
const {login,register,AdminLogin,forget_password,reset_password} =require('../controllers/UserControl')
const router=express.Router()



router.post("/login",login)
router.post("/register",register)
router.post("/admin",AdminLogin)
router.post("/forget",forget_password)
router.post("/reset-password/:token",reset_password)

module.exports=router;