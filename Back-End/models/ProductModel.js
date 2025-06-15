const { required } = require('joi')
const mongoose=require('mongoose')
const bcrpt=require('bcryptjs')
const jwt= require('jsonwebtoken')

const ProductSchema=new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Date,required:true}
})

module.exports=  mongoose.models.Product || mongoose.model('Product',ProductSchema)