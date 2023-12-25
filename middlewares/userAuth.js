const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next){
    try{
      const token = req.cookies.userToken;
      if(token){
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(verifiedToken){
          //console.log(verifiedToken)
            next();
        }
        //next();
      }else{
        return res.redirect("/api/v1/login-user");
      }
    }
    catch(err){
        console.log(err.message);
       
    }
};

module.exports = {verifyUser};