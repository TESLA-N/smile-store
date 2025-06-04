import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";
// import { protect } from "../middleware/authMiddleware.js"; // your auth middleware
import { protect } from "../middleware/authmiddleware.js";

const oroute = express.Router();

oroute.route("/")
  .post(protect, createOrder)
  .get(protect, getUserOrders);

oroute.route("/all")
  .get(protect, getAllOrders);

oroute.route("/:id")
  .get(protect, getOrderById)
  .put(protect, updateOrderStatus);

export default oroute;
