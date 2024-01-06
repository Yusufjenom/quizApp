const mongoose = require('mongoose');


const qAndaSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  question:{
    type: String,
    required: true
  },
  options:{
    type: Array,
    required: true,
    default: []
  }
})