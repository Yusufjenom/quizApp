const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {connectToDatabase} = require('./database/db');
const adminRoutes = require('./routers/adminRoutes');
const generalRoutes = require('./routers/generalRoute');
const userRoutes = require('./routers/userRoutes');
const jwt = require('jsonwebtoken');
const {UserModel} = require('./models/users/userModel');
const {AdminModel} = require('./models/admin/adminModel');
const {handleErrorMiddleware} = require('./middlewares/catchError');


const port = process.env.PORT || 8080;
const app = express();


//MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

//ROUTES MIDDLEWARE
app.use('/api/v1', adminRoutes);
app.use('/api/v1', generalRoutes);
app.use('/api/v1', userRoutes);


//GET THE LANDING PAGE
app.get('/', async (req, res) => {
  try{
   const userToken = req.cookies.userToken;
   const adminToken = req.cookies.adminToken;
     
   let user;
   let admin;
   if(userToken){
    const userId = await jwt.verify(userToken, process.env.JWT_SECRET).id;
     user = await UserModel.findById(userId);
    // console.log(user)
   }

   if(adminToken){
    const adminId = await jwt.verify(adminToken, process.env.JWT_SECRET).id;
     admin = await AdminModel.findById(adminId);
   }
  //  console.log(user)
    res.status(200).render("landingPage", {user, admin});
 }
 catch(err){
     console.log(err.message);
 }
});


app.use(handleErrorMiddleware);

//SPINNING DEV PORT AND CONNECTING TO DATABASE
(async function(){
  try{
    const connected = await connectToDatabase();
    setTimeout(() => {
        app.listen(port, () => console.log(`server running on localhost port:${port}`));
    }, 1000)
  }
  catch(err){
    console.log(err.message)
  }
})();