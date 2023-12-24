const mongoose = require('mongoose');
//const {isEmail} = require('validator');

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, "kindly enter an email address"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "kindly enter a password"],
        minlength: 6
    }
}, {timestamps: true});

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = {AdminModel};