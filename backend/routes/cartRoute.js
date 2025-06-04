import express from "express";
import {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authmiddleware.js";
const cartrouter = express.Router();

cartrouter.route("/").get(protect, getCart);
cartrouter.route("/add").post(protect, addToCart);
cartrouter.route("/increase").post(protect, increaseQuantity);
cartrouter.route("/decrease").post(protect, decreaseQuantity);
cartrouter.route("/remove").post(protect, removeItem);
cartrouter.route("/clear").post(protect, clearCart);

export default cartrouter;
