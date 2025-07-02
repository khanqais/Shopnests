const { required } = require('joi')
const mongoose=require('mongoose')
const bcrpt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const UserSchema=new mongoose.Schema({
    googleId: { type: String, 
        unique: true 

    },
    name:{
        type:String,
        required:[true,'PLease provide name'],
        minlength:3,
        maxlength:50,
    },
    
    email:{
        type:String,
        required:[true,'PLease prove email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
        unique:true,
    },
    password:{
        type:String,
        minlength:6,
    },
    CartData:{
        type:Object,
        default:{}
    }
 
},{minimize:false})

UserSchema.pre('save', async function(next) {
    if (this.password) {
        const salt = await bcrpt.genSalt(10);
        this.password = await bcrpt.hash(this.password, salt);
    }
    next();
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,  
      { expiresIn: process.env.JWT_LIFETIME }
    )
}
  
UserSchema.methods.comparePassword= async function (pass) {
    const isMatch = await bcrpt.compare(pass,this.password)
    return isMatch
}
module.exports=  mongoose.models.User ||  mongoose.model('User',UserSchema)
