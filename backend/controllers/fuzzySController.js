

import Product from "../models/productModel.js";
import Fuse from "fuse.js";
import mongoose from "mongoose";
// Existing fuzzy search controller
export const fuzzySearchProducts = async (req, res) => {
  try {
    const { q, brand, category, minPrice, maxPrice } = req.query;

    let allProducts = await Product.find();
    let results = allProducts;

    if (q) {
      const fuse = new Fuse(allProducts, {
        keys: ["title"],
        threshold: 0.4,
        includeScore: true,
      });
      const fuseResults = fuse.search(q);
      results = fuseResults.map(result => result.item);
    }

    if (brand) {
      results = results.filter(product =>
        product.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    if (category) {
      results = results.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      results = results.filter(product => {
        return (
          (!minPrice || product.price >= parseFloat(minPrice)) &&
          (!maxPrice || product.price <= parseFloat(maxPrice))
        );
      });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ New controller for getting all products without filters
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const productbyid = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};