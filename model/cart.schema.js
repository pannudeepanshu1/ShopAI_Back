const mongoose = require('mongoose');

// Define the Cart Schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one item is added
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0, // Automatically calculated based on items
  },
  totalQuantity: {
    type: Number,
    required: true,
    default: 0, // Automatically calculated based on items
  }
},{timestamps:true});


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
