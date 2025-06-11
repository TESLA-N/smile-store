// // seedProducts.js
// import mongoose from "mongoose";
// import axios from "axios";
// import dotenv from "dotenv";
// import Product from "./models/productModel.js";
// import connectDB from "./config/mongodb.js";

// dotenv.config();

// const seedProducts = async () => {
//   try {
//     await connectDB();

//     // Fetch data from DummyJSON
//     const { data } = await axios.get("https://dummyjson.com/products?limit=100");
//     const products = data.products;

//     // Clear existing products (optional)
//     await Product.deleteMany();

//     // Insert into your DB
//     await Product.insertMany(products);
//     console.log("✅ Products seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Seeding failed:", err);
//     process.exit(1);
//   }
// };

// seedProducts();
