const router = require('express').Router();
const {getQuestions,
        submitAnswers,
        createUser,
        loginUser
     } = require('../controllers/userController');

router.get('/questions', getQuestions);

router.post('/answers', submitAnswers);

router.post('/signup-user', createUser);

router.post('/login-user', loginUser);

module.exports = router;