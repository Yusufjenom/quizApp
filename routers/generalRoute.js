const router = require('express').Router();
const {getLandingPage} = require('../controllers/generalController');


router.get('/home', getLandingPage);

module.exports = router;