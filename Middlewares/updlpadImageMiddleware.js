// const multer = require('multer');
// const ApiError = require('../utils/apiError');

// const multerOptions = () => {

//   const multerStorage = multer.memoryStorage();

//   const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//     } else {
//       cb(new ApiError('Only Images allowed', 400), false);
//     }
//   };

//   const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//   return upload;
// };

// exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

// exports.uploadMixOfImages = (arrayOfFields) =>
//   multerOptions().fields(arrayOfFields);



// //-------------------------------------------
  
// exports.uploadProductImages = uploadMixOfImages([
//     {
//       name: 'imageCover',
//       maxCount: 1,
//     },
//     {
//       name: 'images',
//       maxCount: 5,
//     },
//   ]);
  
//   //--------------------------------------
//   exports.resizeProductImages = asyncHandler(async (req, res, next) => {
//     // console.log(req.files);
//     //1- Image processing for imageCover
//     if (req.files.imageCover) {
//       const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
  
//       await sharp(req.files.imageCover[0].buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 95 })
//         .toFile(`uploads/products/${imageCoverFileName}`);
  
//       // Save image into our db
//       req.body.imageCover = imageCoverFileName;
//     }
//     //2- Image processing for images
//     if (req.files.images) {
//       req.body.images = [];
//       await Promise.all(
//         req.files.images.map(async (img, index) => {
//           const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
  
//           await sharp(img.buffer)
//             .resize(2000, 1333)
//             .toFormat('jpeg')
//             .jpeg({ quality: 95 })
//             .toFile(`uploads/products/${imageName}`);
  
//           // Save image into our db
//           req.body.images.push(imageName);
//         })
//       );
  
//       next();
//     }
//   });