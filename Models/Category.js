const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    // if category name is" A and B" we will save(use) it as a-and-b without spaces and with lowercase (A and B => a-and-b)
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);


// 2- Create model
module.exports = mongoose.model('Category', categorySchema);
