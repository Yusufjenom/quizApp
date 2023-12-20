const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');


//GET QUESTIONS AND ANSWER UPLOAD FORM
const getQA = async (req, res) => {
    try{
    res.status(200).render("uploadQuestionsAndAnswers.ejs");
    }
    catch(err){
        console.log(err.message);
    }
};

//UPLOADING BOTH QUESTIONS AND ANSWERS
const uploadQuestionsAndAnswers = async (req, res) => {
    try {
        //const {course, qAnda} = req.body;
        const data = req.body;
        // console.log(data);
        // let answers = []

        // let correctAnswerContainer = Object.values(data)
        // for(item of correctAnswerContainer){
        //     if(item.includes("Option")){
        //         answers.push(item)
        //     }
        // }
         
        // console.log(answers);

        const newUpload = new QuestionAndAnswerModel({
            qAnda : data
        });
        const savedQuestionsAndAnswer = await newUpload.save();
        console.log(savedQuestionsAndAnswer);
        res.status(201).redirect("/");
    }
    catch (err) {
        console.log(err)
    }
};




module.exports = {uploadQuestionsAndAnswers, getQA};