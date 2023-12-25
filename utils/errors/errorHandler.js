

function errorHandler(err){
    let errors = {email: "", password: ""}
    if(err.message == "this email is already registered"){
        errors.email = "This email is already used"
        return errors;
    }
    if(err.message == "incorrect password"){
        errors.password = "The password you entered is incorrect"
        return errors;
    }
    if(err.message == "invalid email address"){
        errors.email = "The email you entered does not exist"
        return errors;
    }
    return errors;
};

module.exports = {errorHandler};