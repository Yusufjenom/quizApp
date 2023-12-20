const mongoose = require('mongoose');

function connectToDatabase(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to db successfully"))
    .catch(err => console.log(err.message))
};

module.exports = {connectToDatabase};