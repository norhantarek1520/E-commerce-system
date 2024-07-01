const express = require('express');
const router = express();

const { UserController } = require('../Controllers/UserController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')
const { isAdmin } = require('../Middlewares/isAdminMiddleware')



router.put('/update_data', isAuthorized,  UserController.updateUserData)
router.delete('/deleteMe', isAdmin, UserController.deleteUser)
router.get('/user_profile', isAuthorized ,UserController.getUserData)

router.get('/' ,isAdmin,UserController.getAllUsers)

module.exports = router;
