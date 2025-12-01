import express from 'express';
const router = express.Router();

// POST /orders - create a new order
router.post('/', (req, res) => {
  const { shipping } = req.body;
  // Here you’d normally save to MongoDB
  res.status(201).json({ message: 'Order created successfully', shipping });
});

export default router;
