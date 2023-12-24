const router = require('express').Router();
const {getQuestions,
        submitAnswers,
        createUser,
        loginUser,
        getUserSignUpForm,
        getUserLoginForm
     } = require('../controllers/userController');

router.get('/questions', getQuestions);

router.post('/answers', submitAnswers);

router.post('/signup-user', createUser);

router.post('/login-user', loginUser);

router.get('/signup-user', getUserSignUpForm);

router.get('/login-user', getUserLoginForm);

module.exports = router;