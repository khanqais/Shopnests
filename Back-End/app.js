require("dotenv").config();
const express=require('express')
const app=express();
const cors = require("cors");
const connectDB = require("./DB/connect");
const connectCloudinary=require("./config/cloudinary");
const router = require("./routes/auth_route");
const ProductRoute = require("./routes/ProductRoute");
const CartRoute=require('./routes/CartRoute');
const OrderRoute = require("./routes/OrderRoute");
const axios = require("axios");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',router)
app.use('/api/product',ProductRoute)
app.use('/api/cart',CartRoute)
app.use('/api/order',OrderRoute)



setInterval(() => {
  axios.get("https://shopnests.onrender.com")
}, 1000 * 60 * 5);

app.get('/',(req,res)=>{
    res.send("Hii mom ")
})

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to Mongo");
    await connectCloudinary()
    console.log("Connected to Cloudinary");
 
    app.listen(PORT, console.log(`Server is listening on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();