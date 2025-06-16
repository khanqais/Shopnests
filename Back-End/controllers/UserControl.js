const User = require("../models/Usermodels")
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Enter the email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User does not exist" });
  }

  const IsPassword = await user.comparePassword(password);
  if (!IsPassword) {
    return res.status(401).json({ success: false, message: "Incorrect password" });
  }

  const token = user.createJWT();
  res.json({ success: true, token, userId: user._id }); 
};



const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ExistUser = await User.findOne({ email });

    if (ExistUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    res.json({ success: true, token, userId: user._id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" }); 
  }
};

const AdminLogin=async(req,res)=>{
   try {
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
    {
       const token=jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true,token})
    }
    
   } catch (error) {
    console.log(error);
    
   }
}

module.exports={
    login,register,AdminLogin
}