const SubCategory = require("../Models/SubCategory")
const Category = require('../Models/Category')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')
const ApiError = require('../Shared/ApiError')
class SubCategoryController {

    // @route  POST v1/subcategory
    static createSubCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findById(req.body.category) ;
        if(category!= null){
            const subCategory = await SubCategory.create(
                { name: req.body.name, slug: slugify(req.body.name) , category : req.body.category })
    
            res.status(201).json({ "message": "SubCategory Created Succesfully ", data: subCategory })
        }
        else res.status(404).json("this Cagegory is not Exsists ")

       
    })

    // @route  GET v1/subcategory
    static getAllSubCategories = asyncHandler(async (req, res, next) => {
        const limit = req.query.limit * 1 || 1; // to convert it from string to number , if there is no query make it 1 
        const page = req.query.page * 1 || 1;
        const skip = (page - 1) * limit;
        const subCategory = await SubCategory.find().skip(skip).limit(limit).populate({path : "Category" , select :"name"});
        res.status(200).json({ result: subCategory.length, page: page, list: subCategory })
    })

    // @route  GET v1/subcategory/:id
    static getSubCategory = asyncHandler(async (req, res, next) => {
        const subCategory = await SubCategory.findById(req.params.id).populate( "category");
        if (subCategory == null) { return next(new ApiError(`No Category for this id : ${req.params.id}`, 404)) }
        res.status(200).json({ data: subCategory })
    })

      // @route  GET v1/subcategory/:id
    static getSubCategoryInCategory = asyncHandler(async (req, res, next) => {
        // is category exist 
        const categoryExsist = await Category.findById(req.params.id) ;
        if(categoryExsist== null){ return next(new ApiError("This category is not exsit ", 404)) }
        
        
        const subCategory = await SubCategory.find( {category : req.params.id});
        if (subCategory == null) { return next(new ApiError(`No SubCategory for this Cagegory id : ${req.params.id}`, 404)) }
        
        res.status(200).json({ result: subCategory.length, list: subCategory })

        
    })

    // @route  PUT v1/subcategory/:id
    static updateSubCategory = asyncHandler(async (req, res, next) => {
        const subCategory = await SubCategory.findOneAndUpdate(
            { _id: req.params.id },
            { name: req.body.name, slug: slugify(req.body.name) },
            { new: true })
        if (!subCategory) { return next(new ApiError(`No Category for this id ${req.params.id}`, 404)); }
        res.status(201).json({ "message": "Category Updated Succesfully ", data: subCategory })
    })

    // @route  DELETE v1/subcategory/:id
    static deleteSubCategory = asyncHandler(async (req, res, next) => {
        const subCategory = await SubCategory.findOneAndDelete({ _id: req.params.id })
        if (subCategory == null) { return next(new ApiError(`No subCategory for this id ${req.params.id}`, 404)); }
        res.status(204).json({ "message": "subCategory deleted successfully " })
    })


}

module.exports = { SubCategoryController }