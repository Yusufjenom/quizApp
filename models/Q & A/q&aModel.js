const mongoose = require('mongoose');

const questionAndAnswerSchema = new mongoose.Schema({
    qAnda: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const QuestionAndAnswerModel = mongoose.model('questionAndAnswer', questionAndAnswerSchema);

module.exports = {QuestionAndAnswerModel};