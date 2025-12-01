import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


// Connect to MongoDB
connectDB();

// Health check route
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Later we’ll add product, cart, and auth routes here

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
// app.use("/products", productRoutes);
// app.use("/cart", cartRoutes);
// app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));