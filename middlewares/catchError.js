const {HandleError} = require('../utils/errors/errors');

const handleErrorMiddleware = (err, req, res, next) => {
    let errors = {email: "", password: ""}
    if(err instanceof HandleError){
    if(err.message == "this email is already registered"){
        errors.email = "This email is already used"
        return res.status(400).json({
            success: false,
            error: errors
        });
    }
    if(err.message == "incorrect password"){
        errors.password = "The password you entered is incorrect"
        return res.status(400).json({
            success: false,
            error: errors
        });
    }
    if(err.message == "invalid email address"){
        errors.email = "The email you entered does not exist"
        return res.status(400).json({
            success: false,
            error: errors
        });
    }
    if(err.message == "kindly enter an email address"){
        errors.email = "kindly enter an email address";
        return res.status(400).json({
            success: false,
            error: errors
        });
    }
    if(err.message == "admin validation failed: email: Please enter a valid email"){
       errors.email = "Please enter a valid email";
       return res.status(400).json({
        success: false,
        error: errors
       });
    }
    if(err.message == "kindly enter a password"){
       errors.password = "kindly enter a password";
       return res.status(400).json({
        success: false,
        error: errors
       });
    }
    if(err.message == 'Minimum password length is 6 characters'){
        errors.password = 'Minimum password length is 6 characters';
        return res.status(400).json({
            success: false,
            error: errors
        });
    }
    if(err.message == "Password must contain a special character/symbol"){
       errors.password = "Password must contain a special character/symbol";
       return res.status(400).json({
        success: false,
        error: errors
       });
    }
    }


    return res.status(400).json({
        msg: err.message
    });
    
};

module.exports = {handleErrorMiddleware};