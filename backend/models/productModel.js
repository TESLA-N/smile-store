import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
}, {
  timestamps: true // optional: adds createdAt and updatedAt
});

const Product = mongoose.model("Product", productSchema);
export default Product;
