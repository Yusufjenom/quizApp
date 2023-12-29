const router = require('express').Router();
const {verifyAdmin} = require('../middlewares/adminAuth');
const {setCache} = require('../middlewares/cache-control');
const {uploadQuestionsAndAnswers, 
            getQA, 
            createAdmin,
            loginAdmin,
            getAdminSignupForm,
            getAdminLoginForm,
            adminDashboard,
            getAllUsers,
            logoutAdmin,
            viewAllCourses,
            deleteACourse
        } = require('../controllers/adminController');


//QUESTION AND ANSWER UPLOAD ROUTE
router.post('/upload-questions-answers',verifyAdmin, uploadQuestionsAndAnswers);

//GET FORM TO UPLOAD BOTH QUESTIONS AND ANSWER
router.get('/upload-questions-answers',verifyAdmin, getQA);

//CREATE AN ADMIN
router.post('/signup-admin', createAdmin);

//LOGIN ADMIN
router.post('/login-admin', loginAdmin);

router.get('/signup-admin', getAdminSignupForm);

router.get('/login-admin', getAdminLoginForm);

router.get('/admin-dashboard',verifyAdmin, setCache, adminDashboard);

router.get('/users', verifyAdmin, setCache, getAllUsers);

router.get('/logout-admin', logoutAdmin);

router.get('/courses',verifyAdmin, viewAllCourses);

router.delete('/delete-course/:id', verifyAdmin, deleteACourse);


module.exports = router;