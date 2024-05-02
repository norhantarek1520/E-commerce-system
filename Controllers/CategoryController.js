const Category = require("../Models/Category");
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')
const ApiError = require('../Shared/ApiError')
class CategoryController {

    static createCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.create({ name: req.body.name, slug: slugify(req.body.name) })
        res.status(201).json({ "message": "Category Created Succesfully ", data: category })

    })
    static getAllCategories = asyncHandler(async (req, res, next) => {
        const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
        const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
        const skip = (page - 1) * limit;
        const categories = await Category.find().skip(skip).limit(limit);
        res.status(200).json({ result: categories.length, page: page, list: categories })
    })
    static getCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findById(req.params.id);
        if (category == null) { return next(new ApiError(`No Category for this id : ${req.params.id}`, 404)) }
        res.status(200).json({ data: category })
    })
    static updateCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { name: req.body.name, slug: slugify(req.body.name) },
            { new: true })
        if (!category) { return next(new ApiError(`No Category for this id ${req.params.id}`, 404)); }
        res.status(201).json({ "message": "Category Updated Succesfully ", data: category })
    })
    static deleteCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findOneAndDelete({ _id: req.params.id })
        if (category == null) { return next(new ApiError(`No Category for this id ${req.params.id}`, 404)); }
        res.status(204).json({ "message": "Category deleted successfully " })
    })
    static uploadCategoryImage = asyncHandler(async (req,res, next)=>{})
    static  resizeImage = asyncHandler(async (req,res, next)=>{})


}

module.exports = { CategoryController }