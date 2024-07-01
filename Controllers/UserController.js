const User = require('../Models/User')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const getUserId = require('../Shared/SharedFunctions')

class UserController {

    static getAllUsers = asyncHandler(async (req, res, next) => {
        const limit = req.query.limit || 5;
        const page = req.query.page * 1 || 1;
        const skip = (page - 1) * limit;
        const userData = await User.find().skip(skip).limit(limit);
        res.status(200).json({ "result": userData.length, data: userData })

    })
    static getUserData = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization?.split(' ')[1])
        const userData = await User.findById(userId);
        res.status(200).json(userData)

    })
    static updateUserData = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization?.split(' ')[1])
        const user = await User.findByIdAndUpdate(userId,
            { name: req.body.name, email: req.body.email, phone: req.body.phone },
            { new: true }
        );
        if (user == null) return next(ApiError("Faild to update user data ", 500))
        res.status(200).json(user)

    })
    static deleteUser = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization?.split(' ')[1])
        const user = await User.findByIdAndDelete(userId);
        if (user == null) return next(ApiError("Faild to delte this user from the system ", 500))
        res.status(204).json({ "message": "User deleted successfully " })

    })

}

module.exports = { UserController }