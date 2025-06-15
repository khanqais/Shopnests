const jwt=require('jsonwebtoken')

const AdminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:true,message:"Not Authorized"})
        }
        const TokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        if(TokenDecode!== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD)
        {
             return res.json({success:true,message:"Not Authorized"})
        }
        next();
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=AdminAuth;