const express=require('express')
const app=express();
const {login,register,AdminLogin,forget_password,reset_password} =require('../controllers/UserControl')
const router=express.Router()
const passport=require('passport')



router.post("/login",login)
router.post("/register",register)
router.post("/admin",AdminLogin)
router.post("/forget",forget_password)
router.post("/reset-password/:token",reset_password)
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"  
}));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user.createJWT();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}&userId=${req.user._id}`);


  }
);


module.exports=router;