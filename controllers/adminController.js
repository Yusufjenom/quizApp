const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');


//UPLOADING BOTH QUESTIONS AND ANSWERS
const uploadQuestionsAndAnswers = async (req, res) => {
    try {
        const {course, qAnda} = req.body;
        const newUpload = new QuestionAndAnswerModel({
            course,
            qAnda
        });
        const savedQuestionsAndAnswer = await newUpload.save();
        res.status(201).json({
            success: true,
            savedQuestionsAndAnswer
        });
    }
    catch (err) {
        console.log(err)
    }
};




module.exports = {uploadQuestionsAndAnswers};