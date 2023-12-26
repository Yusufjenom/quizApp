const router = require('express').Router();
const {uploadQuestionsAndAnswers, 
            getQA, 
            createAdmin,
            loginAdmin,
            getAdminSignupForm,
            getAdminLoginForm,
            adminDashboard
        } = require('../controllers/adminController');


//QUESTION AND ANSWER UPLOAD ROUTE
router.post('/upload-questions-answers', uploadQuestionsAndAnswers);

//GET FORM TO UPLOAD BOTH QUESTIONS AND ANSWER
router.get('/upload-questions-answers', getQA);

//CREATE AN ADMIN
router.post('/signup-admin', createAdmin);

//LOGIN ADMIN
router.post('/login-admin', loginAdmin);

router.get('/signup-admin', getAdminSignupForm);

router.get('/login-admin', getAdminLoginForm);

router.get('/admin-dashboard', adminDashboard);


module.exports = router;