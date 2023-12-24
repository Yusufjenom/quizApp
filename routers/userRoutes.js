const router = require('express').Router();
const {getQuestions, submitAnswers} = require('../controllers/userController');

router.get('/questions', getQuestions);

router.post('/answers', submitAnswers);

module.exports = router;