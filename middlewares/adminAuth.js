const jwt = require('jsonwebtoken');

async function verifyAdmin(req, res, next){
    try{
      const token = req.cookies.adminToken;
      if(token){
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(verifiedToken){
            next();
        }
      }else{
        res.redirect("/api/v1/login-admin")
      }
      
    }
    catch(err){
        console.log(err.message);
        
    }
};

module.exports = {verifyAdmin};