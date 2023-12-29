const router = require('express').Router();
const {verifyUser} = require('../middlewares/userAuth');
const {verifyAdmin} = require('../middlewares/adminAuth')
const {setCache} = require('../middlewares/cache-control');
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
        logoutUser,
        getAllResults
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

router.get('/results', verifyUser, getAllResults);

module.exports = router;