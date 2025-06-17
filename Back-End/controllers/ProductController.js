
const { v2: cloudinary } = require('cloudinary');
const ProductModel = require('../models/ProductModel');

const AddProduct= async (req,res)=>{
       try {
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body
        const image1=  req.files.image1 && req.files.image1[0]
        const image2= req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4= req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=> item!== undefined)

        let imageUrl= await Promise.all(
            images.map(async (item)=>{
              let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
              return result.secure_url
            })
        )

        const productData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:  JSON.parse(sizes),
            bestseller: bestseller==="true"? true:false,
            image:imageUrl,
            date:Date.now()

        }
        

        const product=await ProductModel.create(productData)

        res.json({success:true,message:"Product Added"})
        
        
       } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong", error });
        
        
       }
}
const ListProduct=async(req,res)=>{
    try {
        const products=await ProductModel.find({})
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        
    }
       
}
const RemoveProduct=async(req,res)=>{
    try {
        const {id}=req.body
        if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }
        await ProductModel.findByIdAndDelete(id)
        res.json({success:true,message:"Product Remove"})
    } catch (error) {
        console.log(error);
        
    }
       
}
const SingleProduct=async(req,res)=>{
    const {prodcutID}=req.body;
    const product= await ProductModel.findById(prodcutID)
    res.json({success:true,product})
       
}

module.exports={
    AddProduct,ListProduct,RemoveProduct,SingleProduct
}