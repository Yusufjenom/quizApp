const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');



//DISPLAY QUESTIONS
const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionAndAnswerModel.find();
        const displayQuestions = questions[0].qAnda[0];
        //console.log(displayQuestions);
        res.status(200).render("viewQuestions", { displayQuestions });
    }
    catch (err) {
        console.log(err.message);
    }
};

//SUBMIT ANSWERS
const submitAnswers = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const newAns = Object.values(data);
        console.log(newAns);

        //get correct answers from db
        const questions = await QuestionAndAnswerModel.find();
        const displayQuestions = questions[0].qAnda[0];
        let ans = [];
        let x = Object.values(displayQuestions);
        for (item of x) {
            if (item.includes('Option')) {
                ans.push(item)
            }
        };
        console.log(ans)

        //Marking and score algo 
        let count = 0;
        for(let i = 0; i < newAns.length; i++){
            if(newAns[i] == ans[i]){
                count ++
            }
        }
         console.log(count)
        res.status(200).json({
            redirect: "/"
        });
    }
    catch (err) {
        console.log(err);
    }
};


module.exports = { getQuestions, submitAnswers };