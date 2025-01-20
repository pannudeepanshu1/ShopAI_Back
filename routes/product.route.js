const express = require('express');
const {
  createProduct,
  getAllProducts,

} = require('../controllers/product.controller.js');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);



module.exports = router;
