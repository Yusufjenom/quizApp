const mongoose = require('mongoose');

const questionAndAnswerSchema = new mongoose.Schema({
    course:{
        type: String,
        required: true
    },
    // question:{
    //     type: String,
    //     required: true
    // },
    // answer: {
    //     type: String,
    //     required: true
    // },
    qAnda: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const QuestionAndAnswerModel = mongoose.model('questionAndAnswer', questionAndAnswerSchema);

module.exports = {QuestionAndAnswerModel};