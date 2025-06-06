import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

// Import your routes correctly
import userRoutes from "./routes/userRoute.js";
import cartrouter from "./routes/cartRoute.js";
import addressRoutes from "./routes/addressRoutes.js";
import oroute from "./routes/orderRoute.js";
import router from "./routes/productRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.get("/",(req, res)=>{
    res.send("working");
});
app.use("/api/users", userRoutes);
// app.use("/api/products", productRouter);
app.use("/api/cart", cartrouter);
app.use("/api/address", addressRoutes);
app.use("/api/order", oroute);
app.use("/api/products", router);

// If you want, uncomment other routes when ready
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/shipping", shippingRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
