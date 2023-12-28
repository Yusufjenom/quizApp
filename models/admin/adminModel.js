const mongoose = require('mongoose');
const {isEmail} = require('validator');

const checkForSpecialCharacters = (value) => {
    let specialCharacterWithRegex = /[!@#$%^&*(),.{}|<>]/;
    return specialCharacterWithRegex.test(value);
}
const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, "kindly enter an email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "kindly enter a password"],
        minlength: [6, 'Minimum password length is 6 characters'],
        validate: {
            validator: checkForSpecialCharacters,
            message: "Password must contain a special character/symbol"
        }
    }
}, {timestamps: true});

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = {AdminModel};