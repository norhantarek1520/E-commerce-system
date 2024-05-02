const express = require('express');
const router = express();
const {AuthController}= require('../Controllers/AuthController')
const {signupValidator , loginValidator}  = require('../Shared/Validator/authValidator')
const {isAuthorized}= require("../Middlewares/isAuthorizedMiddleware")

router.post('/register',signupValidator ,AuthController.register)
router.post('/login' , loginValidator,AuthController.login)
router.post('/logout' , isAuthorized ,AuthController.logout)
router.post('/forgetpassword' ,AuthController.forgetPassword)
router.post('/verifyResetCode', AuthController.verifyPassResetCode);
router.put('/resetPassword', AuthController.resetPassword);




module.exports = router;