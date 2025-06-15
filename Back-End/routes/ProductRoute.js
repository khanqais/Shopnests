const express=require('express')
const ProductRoute=express.Router();
const {AddProduct,ListProduct,RemoveProduct,SingleProduct} =require("../controllers/ProductController")
const upload=require('../middleware/multer');
const AdminAuth = require('../middleware/AdminAuth');

ProductRoute.post('/add',AdminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),AddProduct);
ProductRoute.post('/remove',AdminAuth,RemoveProduct);
ProductRoute.get('/list',ListProduct);
ProductRoute.post('/single',SingleProduct);

module.exports=ProductRoute
