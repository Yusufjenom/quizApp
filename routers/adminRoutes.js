const router = require('express').Router();
const {uploadQuestionsAndAnswers, getQA} = require('../controllers/adminController');


//QUESTION AND ANSWER UPLOAD ROUTE
router.post('/upload-questions-answers', uploadQuestionsAndAnswers);

//GET FORM TO UPLOAD BOTH QUESTIONS AND ANSWER
router.get('/upload-questions-answers', getQA);


module.exports = router;