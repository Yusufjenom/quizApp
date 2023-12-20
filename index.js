const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {connectToDatabase} = require('./database/db');
const adminRoutes = require('./routers/adminRoutes');


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