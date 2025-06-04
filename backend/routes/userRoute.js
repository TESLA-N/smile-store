import express from "express";
// import protect from "../middleware/authmiddleware.js";
import { protect } from "../middleware/authmiddleware.js";
import product from "../models/productModel.js"


import {
  registerUser,
  loginUser,
  getUserProfile,
   updateUserProfile,
   updatePassword,
   getUserWishlist,
addToWishlist,
removeFromWishlist,

 
} from "../controllers/userController.js";

const userRouter = express.Router();

// Auth ,
// getCart,
// updateCart,
// getUserOrders
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile/update", protect, updateUserProfile);
userRouter.put("/password/update", protect, updatePassword);

// // Wishlist
userRouter.get("/wishlist",protect, getUserWishlist);
userRouter.post("/wishlist/add",protect, addToWishlist);
userRouter.delete("/wishlist/remove/:productId",protect, removeFromWishlist);
// router.delete("/wishlist/clean",protect, cleanWishlist);
// router.delete('/wishlist/remov/:id', protect, removeWishlistItem);
// // Cart
// userRouter.get("/cart", getCart);
// userRouter.put("/cart/update", updateCart);

// // // Orders
// userRouter.get("/orders", getUserOrders);

// // // Address
// userRouter.get("/address", getAddress);
// userRouter.put("/address/update", updateAddress);

export default userRouter;
