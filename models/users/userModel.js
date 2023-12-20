const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    suspended: {
        type: Boolean,
        default: false
    },
    currentResult:{
        type: Array,
        default: []
    }
}, {timestamps: true});

const UserModel = mongoose.model('user', userSchema);

module.exports = {UserModel};