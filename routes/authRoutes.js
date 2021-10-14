const { Router } = require('express');
const authController = require('../controllers/authController')


const router = Router();

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);

//course:
router.get('/pycourse',authController.pycourse_get);
router.get('/fecourse',authController.fecourse_get);
router.get('/jcourse',authController.jcourse_get);

router.get('/profile',authController.profile_get);

router.put('/profile',authController.profile_put);


module.exports = router;