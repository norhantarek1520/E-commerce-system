const SubCategory = require("../Models/SubCategory")
const Category = require('../Models/Category')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')
const ApiError = require('../Shared/ApiError')
class SubCategoryController {

    static createSubCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findById(req.body.category);
        if (category != null) {
            const subCategory = await SubCategory.create(
                { name: req.body.name, slug: slugify(req.body.name), category: req.body.category })

            res.status(201).json({ "message": "SubCategory Created Succesfully ", data: subCategory })
        }
        else res.status(404).json("this Cagegory is not Exsists ")


    })

    static getAllSubCategories = asyncHandler(async (req, res, next) => {
        const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
        const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
        const skip = (page - 1) * limit;
       // const subCategory = await SubCategory.find().skip(skip).limit(limit).populate({path : "Category" , select :"name"});
        const subCategory = await SubCategory.find().skip(skip).limit(limit);

        res.status(200).json({ result: subCategory.length, page: page, list: subCategory })
    })

    static getSubCategory = asyncHandler(async (req, res, next) => {
        // const subCategory = await SubCategory.findById(req.params.id).populate( "category");
        const subCategory = await SubCategory.findById(req.params.id);
        if (subCategory == null) { return next(new ApiError(`No Category for this id : ${req.params.id}`, 404)) }
        res.status(200).json({ data: subCategory })
    })
   
    static getSubCategoryInCategory = asyncHandler(async (req, res, next) => {
        // is category exist 
        const categoryExsist = await Category.findById(req.params.id);
        if (categoryExsist == null) { return next(new ApiError("This category is not exsit ", 404)) }


        const subCategory = await SubCategory.find({ category: req.params.id });
        if (subCategory == null) { return next(new ApiError(`No SubCategory for this Cagegory id : ${req.params.id}`, 404)) }

        res.status(200).json({ result: subCategory.length, list: subCategory })


    })

    static updateSubCategory = asyncHandler(async (req, res, next) => {
        const subCategory = await SubCategory.findOneAndUpdate(
            { _id: req.params.id },
            { name: req.body.name, slug: slugify(req.body.name) },
            { new: true })
        if (!subCategory) { return next(new ApiError(`No Category for this id ${req.params.id}`, 404)); }
        res.status(201).json({ "message": "Category Updated Succesfully ", data: subCategory })
    })
    
    static deleteSubCategory = asyncHandler(async (req, res, next) => {
        const subCategory = await SubCategory.findOneAndDelete({ _id: req.params.id })
        if (subCategory == null) { return next(new ApiError(`No subCategory for this id ${req.params.id}`, 404)); }
        res.status(204).json({ "message": "subCategory deleted successfully " })
    })


}

module.exports = { SubCategoryController }