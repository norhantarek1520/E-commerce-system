const express = require('express');
const router = express();
const {AuthController}= require('../Controllers/AuthController')
const {signupValidator , loginValidator , resetPasswordValidator ,forgetPasswordValidator}  = require('../Shared/Validator/authValidator')
const {isAuthorized}= require("../Middlewares/isAuthorizedMiddleware")

router.post('/register',signupValidator ,AuthController.register)
router.post('/login' , loginValidator,AuthController.login)
router.post('/logout' , isAuthorized ,AuthController.logout)
router.post('/forgetpassword' ,forgetPasswordValidator , AuthController.forgetPassword)
router.post('/verifyResetCode', AuthController.verifyPassResetCode);
router.post('/resetPassword',resetPasswordValidator, AuthController.resetPassword);




module.exports = router;