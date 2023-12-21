const {QuestionAndAnswerModel} = require('../models/Q & A/q&aModel');



//DISPLAY QUESTIONS
const getQuestions = async (req, res) => {
    try{
      const questions = await QuestionAndAnswerModel.find();
      console.log(questions[0].qAnda);
      const displayQuestions = questions[0].qAnda[0];
      console.log(displayQuestions);
     res.status(200).render("viewQuestions", {displayQuestions});
    }
    catch(err){
        console.log(err.message);
    }
};


module.exports = {getQuestions};