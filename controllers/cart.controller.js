const Cart = require('../model/cart.schema.js');

// Add a product to the cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update the quantity of the existing product
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.items.push({ productId, quantity });
      }

      // Recalculate total price and quantity
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0); // Replace `10` with product price
      cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

      await cart.save();
    } else {
      // Create a new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
        totalPrice: quantity * price, // Replace `10` with product price
        totalQuantity: quantity,
      });

      await cart.save();
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    // Recalculate total price and quantity
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0); // Replace `10` with product price
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');

    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
