const express=require('express')
const app=express();
const {login,register,AdminLogin} =require('../controllers/UserControl')
const router=express.Router()



router.post("/login",login)
router.post("/register",register)
router.post("/admin",AdminLogin)

module.exports=router;