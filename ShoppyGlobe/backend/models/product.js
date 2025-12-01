import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },

    // New fields
    image: { type: String }, // URL or path to product image
    discountPercentage: { type: Number, default: 0 }, // e.g. 15 means 15% off
    rating: { type: Number, default: 0, min: 0, max: 5 } // average rating out of 5
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;