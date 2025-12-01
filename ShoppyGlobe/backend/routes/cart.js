import express from "express";
import Cart from "../models/cart.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// Test route
router.get("/",protect, (req, res) => {
  res.send("Cart route is working");

});

// Add item to cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Validate stock
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const cartItem = new Cart({ userId: req.user._id, productId, quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get cart by userId
router.get("/:userId", protect,async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId }).populate("productId");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
router.delete("/:id",protect, async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// Update item quantity in cart
// UPDATE cart item by ID
router.put("/:id",protect, async (req, res) => {
  try {
    const { quantity } = req.body;

    // Update only the quantity for now
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    );

    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


export default router;