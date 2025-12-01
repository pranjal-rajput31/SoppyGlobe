import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE product by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



export default router;