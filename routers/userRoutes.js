const router = require('express').Router();
const {getQuestions,
        submitAnswers,
        createUser,
        loginUser,
        getUserSignUpForm,
        getUserLoginForm,
        getCoursesList,
        getACourseByCourseId
     } = require('../controllers/userController');

router.get('/questions/:id', getACourseByCourseId);  //getQuestions

router.post('/answers', submitAnswers);

router.post('/signup-user', createUser);

router.post('/login-user', loginUser);

router.get('/signup-user', getUserSignUpForm);

router.get('/login-user', getUserLoginForm);

router.get('/select-course', getCoursesList);

module.exports = router;