import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" }, // pending, success, failed
  transactionId: String,
  paidAt: Date
});

const paymentModel =
  mongoose.models.payment || mongoose.model("payment", paymentSchema);

export default paymentModel;
