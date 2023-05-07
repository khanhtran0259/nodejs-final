const { Router } = require('express')

//handle error


const authController = require('../controllers/authController')
const router = Router();

router.get('/register', authController.register_get);
router.post('/register', authController.register_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/forgot-password', authController.forgor_get);
router.post('/forgot-password', authController.forgot_post);

router.get('/inbox', authController.inboxmail_get)
router.get('/sent', authController.sentmail_get)
router.get('/received', authController.receivedmail_get)

router.get('/sent-email', authController.formEmail_get)
router.post('/sent-email', authController.formEmail_post)
router.get("/details", authController.details_get);


module.exports = router;