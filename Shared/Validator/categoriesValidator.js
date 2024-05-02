const {check}= require("express-validator");
const validatorMiddleware = require('../../Middlewares/validatorMiddleware')

exports.categoryIdValidator = [
    check('id').isMongoId().withMessage("Invalid Mongodb id format") ,
     validatorMiddleware 
]
exports.createCategoryValidator = [
    check('name').notEmpty().withMessage("Category Name is required ") ,
     validatorMiddleware 
]
