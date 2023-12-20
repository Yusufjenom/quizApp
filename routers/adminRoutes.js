const router = require('express').Router();
const {uploadQuestionsAndAnswers} = require('../controllers/adminController');


//QUESTION AND ANSWER UPLOAD ROUTE
router.post('/upload-questions-answers', uploadQuestionsAndAnswers);


module.exports = router;