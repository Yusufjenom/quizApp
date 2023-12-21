const router = require('express').Router();
const {getQuestions} = require('../controllers/userController');

router.get('/questions', getQuestions);

module.exports = router;