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
const passport=require('passport')
const user = require("./models/Usermodels")
const Google=require("passport-google-oauth20").Strategy 
const session=require('express-session');

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',router)
app.use('/api/product',ProductRoute)
app.use('/api/cart',CartRoute)
app.use('/api/order',OrderRoute)
passport.use(
  new Google(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CallBackURl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
       
        let existingUser = await user.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }
        
        
        let userByEmail = await user.findOne({ email: profile.emails[0].value });
        
        if (userByEmail) {
          userByEmail.googleId = profile.id;
          userByEmail.profilePicture = profile.photos[0].value;
          await userByEmail.save();
          return done(null, userByEmail);
        }

        
        const newUser = new user({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        console.error("Google auth error:", err);
        return done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await user.findById(id);
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

setInterval(() => {
  axios.get("https://shopnests.onrender.com")
}, 1000 * 60 * 15);

app.get('/',(req,res)=>{
    res.send("Hii mom  ")
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