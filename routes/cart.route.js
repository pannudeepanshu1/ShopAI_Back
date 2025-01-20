const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cart.controller.js');

const router = express.Router();

// Add to cart
router.post('/add', addToCart);

// Remove from cart
router.post('/remove', removeFromCart);

// Get user's cart
router.get('/:userId', getCart);

module.exports = router;
