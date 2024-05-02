const Product = require('../Models/Product')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const slugify =require("slugify");
const Category = require('../Models/Category');
const SubCategory = require('../Models/SubCategory');
class ProductController{

    
static createProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create({ 
        title  : req.body.title , 
        slug  : req.body.slug, 
        description  : req.body.description , 
        quantity  : req.body.quantity , 
        sold  : req.body.sold , 
        price  : req.body.price , 
        priceAfterDiscount  : req.body.priceAfterDiscount , 
        colors : req.body.colors , 
        category  : req.body.category , 
        subcategories  : req.body.subcategories , 
        ratingsAverage  : req.body.ratingsAverage ,
        ratingsQuantity : req.body.ratingsQuantity

     })
     if(product == null ) return next(new ApiError("Failed to create This product " ,  500 ))
    res.status(201).json({ "message": "Product Created Succesfully ", data: product })

})
static getProducts  = asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
    const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit).populate({path : "Category" , selected :"name"});
    if (products == null) return next(new ApiError("No Product List" , 404)) ;
    res.status(200).json({result : products.length , "data":products})
})
static getProductById  = asyncHandler(async (req, res, next) => { // product id 
    const product = await Product.findById(req.params.id) ;
    if (product == null) return next(new ApiError("No Product with this id" , 404)) ;
    res.status(200).json(product)
})
static updateProduct = asyncHandler(async (req, res, next) => {
     const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { 
                title  : req.body.title , 
                description  : req.body.description , 
                quantity  : req.body.quantity , 
                sold  : req.body.sold , 
                price  : req.body.price , 
                priceAfterDiscount  : req.body.priceAfterDiscount , 
                colors : req.body.colors , 
                category  : req.body.category , 
                subcategories  : req.body.subcategories , 
                ratingsAverage  : req.body.ratingsAverage ,
                ratingsQuantity : req.body.ratingsQuantity
            },
            { new: true })
        if (!product) { return next(new ApiError(`No product for this id ${req.params.id}`, 404)); }
        res.status(201).json({ "message": "product Updated Succesfully ", data: product })
   
})
static deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id })
    if (product == null) { return next(new ApiError(`No product for this id ${req.params.id}`, 404)); }
    res.status(204).json({ "message": "product deleted successfully " })
})


// @ dec : get all products in this Category using category id 
static getProductsByCategoryId  = asyncHandler(async (req, res, next) => { 
    const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
    const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
    const skip = (page - 1) * limit;
    const productsInCategory  =await Product.find({category:req.params.categoryid}).skip(skip).limit(limit);
    console.log(productsInCategory)
    if(productsInCategory == null) return next(new ApiError("This Cagegory is Empty( No Products in this Categoy )",404))
    res.status(200).json(productsInCategory)
})
// @ dec : get all products in this Category using category id 
static getProductsByCategoryName  = asyncHandler(async (req, res, next) => { 
    const category = await Category.findOne({ slug: req.query.categoryNameSlug });

    if (!category) {
      return next(new ApiError("This Category is Empty( No Products in this Categoy )", 404));
    }
  
    const categoryId = category._id; // Extract the ID from the category document
  
    const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
    const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
    const skip = (page - 1) * limit;
    const productsInCategory  = await Product.find({category:categoryId}).skip(skip).limit(limit);
    if(productsInCategory == null) return next(new ApiError("This Cagegory is Empty( No Products in this Categoy )",404))
    res.status(200).json({result : productsInCategory.length ,  "data":productsInCategory})

 


})
// @ dec : get all products in this sub category  using sub categroy name 
static getProductsBySubCategoryName  = asyncHandler(async (req, res, next) => {// subcategory name  
    const subcategory = await SubCategory.findOne({ slug: req.query.subcategoryNameSlug });

    if (!subcategory) {
      return next(new ApiError("This Sub Category is Empty( No Products in this Sub Categoy )", 404));
    }
  
    const subcategoryId = subcategory._id; // Extract the ID from the category document
  
    const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
    const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
    const skip = (page - 1) * limit;
    const productsInSubcategory  = await Product.find({subcategories:subcategoryId}).skip(skip).limit(limit);
    if(productsInSubcategory == null) return next(new ApiError("This Cagegory is Empty( No Products in this Categoy )",404))
    res.status(200).json({result : productsInSubcategory.length ,  "data":productsInSubcategory})

})
// @ dec : get all products in this Category using category id 
static getProductsBySubcategoryId  = asyncHandler(async (req, res, next) => { 
    const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
    const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
    const skip = (page - 1) * limit;
    const productsInSubcategory  = await Product.find({subcategories:req.params.subcategoryid}).skip(skip).limit(limit);
    if(productsInSubcategory == null) return next(new ApiError("This Cagegory is Empty( No Products in this Categoy )",404))
    res.status(200).json({result : productsInSubcategory.length ,  "data":productsInSubcategory})

})

static resizeProductImages = asyncHandler(async (req, res, next)=>{

})
static uploadProductImages = asyncHandler(async (req, res, next)=>{
    
})


}

module.exports={ProductController}