const router = require('express').Router();
const {verifyUser} = require('../middlewares/userAuth');
const {getQuestions,
        submitAnswers,
        createUser,
        loginUser,
        getUserSignUpForm,
        getUserLoginForm,
        getCoursesList,
        getACourseByCourseId,
        getUserDashboard,
        userResult,
        logoutUser
     } = require('../controllers/userController');

router.get('/questions/:id', verifyUser, getACourseByCourseId);  //getQuestions

router.post('/answers', verifyUser, submitAnswers);

router.post('/signup-user', createUser);

router.post('/login-user', loginUser);

router.get('/signup-user', getUserSignUpForm);

router.get('/login-user', getUserLoginForm);

router.get('/select-course', verifyUser, getCoursesList);

router.get('/user-dashboard', verifyUser, getUserDashboard);

router.get('/user-result', verifyUser, userResult);

router.get('/logout-user', logoutUser);

module.exports = router;