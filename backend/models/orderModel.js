import mongoose from "mongoose";
// import Order from "../models/orderModel.js";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  image: String,
  price: Number,
  quantity: Number,
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderItems: [orderItemSchema],

  shippingAddress: shippingAddressSchema,

  paymentMethod: {
    type: String,
    enum: ["COD", "Razorpay", "Stripe", "UPI", "Wallet"],
    default: "COD",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },

  totalAmount: { type: Number, required: true },

  isDelivered: { type: Boolean, default: false },

  deliveredAt: Date,

  orderStatus: {
    type: String,
    enum: ["Processing", "Packed", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
