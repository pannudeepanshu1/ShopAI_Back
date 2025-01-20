const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is non-negative
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],

},{timestamps:true});



const Product = mongoose.model('Product', productSchema);
module.exports = Product;
