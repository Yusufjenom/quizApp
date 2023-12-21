


//DISPLAY QUESTIONS
const getQuestions = async (req, res) => {
    try{
     res.status(200).render("viewQuestions");
    }
    catch(err){
        console.log(err.message);
    }
};


module.exports = {getQuestions};