import express from "express";
import Cart from "../models/cart.js";
import protect from "../middleware/authMiddleware.js";
import Product from "../models/product.js";

const router = express.Router();

// ✅ Test route
router.get("/test", protect, (req, res) => {   // CHANGED: moved test route to /test to avoid conflict with GET /
  res.send("Cart route is working");
});

// ✅ Add item to cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;   // CHANGED: default quantity = 1

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Validate stock
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // CHANGED: find or create cart for user
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // CHANGED: update existing item or push new
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate("items.productId");
    res.status(201).json({ items: populated.items });   // CHANGED: return items array
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get cart for logged-in user
router.get("/", protect, async (req, res) => {   // CHANGED: removed :userId param, always use req.user._id
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    res.json({ items: cart?.items || [] });   // CHANGED: return items array
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update item quantity
router.put("/:productId", protect, async (req, res) => {   // CHANGED: use productId instead of cartItem id
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Quantity must be >= 1" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.productId");
    res.json({ items: populated.items });   // CHANGED: return items array
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove item
router.delete("/:productId", protect, async (req, res) => {   // CHANGED: use productId instead of cartItem id
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.productId");
    res.json({ items: populated.items });   // CHANGED: return items array
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Clear cart
router.delete("/clear", protect, async (req, res) => {   // NEW: clear route
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });
    cart.items = [];
    await cart.save();
    res.json({ items: [] });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ error: "Server error clearing cart" });
  }
});

export default router;


// import express from "express";
// import Cart from "../models/cart.js";
// import protect from "../middleware/authMiddleware.js";
// import Product from "../models/product.js";
// const router = express.Router();


// // Test route
// router.get("/",protect, (req, res) => {
//   res.send("Cart route is working");

// });

// // Add item to cart
// router.post("/", protect, async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Validate product exists
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     // Validate stock
//     if (quantity > product.stock) {
//       return res.status(400).json({ error: "Not enough stock available" });
//     }

//     const cartItem = new Cart({ userId: req.user._id, productId, quantity });
//     await cartItem.save();
//     res.status(201).json(cartItem);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // Get cart by userId
// router.get("/:userId", protect,async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ userId: req.params.userId }).populate("productId");
//     res.json(cartItems);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Remove item from cart
// router.delete("/:id",protect, async (req, res) => {
//   try {
//     const cartItem = await Cart.findByIdAndDelete(req.params.id);
//     if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
//     res.json({ message: "Item removed from cart" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
// // Update item quantity in cart
// // UPDATE cart item by ID
// router.put("/:id",protect, async (req, res) => {
//   try {
//     const { quantity } = req.body;

//     // Update only the quantity for now
//     const cartItem = await Cart.findByIdAndUpdate(
//       req.params.id,
//       { quantity },
//       { new: true, runValidators: true }
//     );

//     if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
//     res.json(cartItem);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });


// export default router;

