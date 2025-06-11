// import mongoose from "mongoose";
// import userModel from "../models/userModel.js";
// // import bcrypt from "bcrypt";
// import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
// import cloudinary from "cloudinary";
// import Product from "../models/productModel.js";

// // Cloudinary config
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Register
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, profilePic } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email, and password are required" });
//     }

//     if (!/^\d{6,8}$/.test(password)) {
//       return res.status(400).json({ message: "Password must be a number between 6 to 8 digits" });
//     }

//     const userExists = await userModel.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     let uploadedPic = "";
//     if (profilePic) {
//       const uploadedResponse = await cloudinary.v2.uploader.upload(profilePic, {
//         folder: "profile_pics",
//       });
//       uploadedPic = uploadedResponse.secure_url;
//     }

//     const newUser = await userModel.create({
//       name,
//       email,
//       password: hashedPassword,
//       profilePic: uploadedPic || "",
//     });

//     res.status(201).json({
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       token: generateToken(newUser._id),
//       profilePic: newUser.profilePic,
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Error in registration", error: err.message });
//   }
// };

// // Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//       profilePic: user.profilePic,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };

// // Get Profile
// export const getUserProfile = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     res.status(200).json({
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//       profilePic: req.user.profilePic,
//       createdAt: req.user.createdAt,
//       updatedAt: req.user.updatedAt,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching profile", error: error.message });
//   }
// };

// // Update Profile
// export const updateUserProfile = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { name, email, profilePic } = req.body;

//     if (profilePic) {
//       const uploaded = await cloudinary.v2.uploader.upload(profilePic, {
//         folder: "profile_pics",
//       });
//       user.profilePic = uploaded.secure_url;
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: "Update failed", error: err.message });
//   }
// };

// // Update Password
// export const updatePassword = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     const { currentPassword, newPassword } = req.body;

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

//     if (!/^\d{6,8}$/.test(newPassword)) {
//       return res.status(400).json({ message: "New password must be a number between 6 to 8 digits" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Password update failed", error: err.message });
//   }
// };

// // Wishlist - Get
// export const getUserWishlist = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id).populate("wishlist.productId");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user.wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching wishlist", error: error.message });
//   }
// };

// // Wishlist - Add
// export const addToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ message: "Invalid or missing productId" });
//     }

//     const user = await userModel.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.wishlist = user.wishlist || [];

//     const alreadyInWishlist = user.wishlist.some(item => {
//       return item?.productId?.toString?.() === productId;
//     });

//     if (alreadyInWishlist) {
//       return res.status(400).json({ message: "Product already in wishlist" });
//     }

//     user.wishlist.push({ productId });
//     await user.save();

//     res.status(200).json({ message: "Added to wishlist" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to wishlist", error: error.message });
//   }
// };

// // Wishlist - Remove
// export const removeFromWishlist = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await userModel.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const productIdStr = productId.toString();
//     const originalLength = user.wishlist.length;

//     user.wishlist = user.wishlist.filter(item => {
//       return !item.productId || item.productId.toString() !== productIdStr;
//     });

//     if (originalLength === user.wishlist.length) {
//       return res.status(404).json({ message: "Product not found in wishlist" });
//     }

//     await user.save();
//     res.json({ message: "Product removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import Product from "../models/productModel.js";
// import {logout}

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (!/^\d{6,8}$/.test(password)) {
      return res.status(400).json({ message: "Password must be a number between 6 to 8 digits" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let uploadedPic = "";
    if (req.file?.path) {
      const uploaded = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "profile_pics",
      });
      uploadedPic = uploaded.secure_url;
    }

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      profilePic: uploadedPic,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      profilePic: newUser.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in registration", error: err.message });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
// Logout user by clearing the cookie
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// ✅ Get Profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// ✅ Update Profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email } = req.body;

    if (req.file?.path) {
      // Delete old image (optional)
      if (user.profilePic) {
        const publicId = user.profilePic.split("/").pop().split(".")[0];
        try {
          await cloudinary.v2.uploader.destroy(`profile_pics/${publicId}`);
        } catch (e) {
          console.log("Cloudinary delete failed:", e.message);
        }
      }

      const uploaded = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "profile_pics",
      });
      user.profilePic = uploaded.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
      profilePic: updatedUser.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// ✅ Update Password
export const updatePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    if (!/^\d{6,8}$/.test(newPassword)) {
      return res.status(400).json({ message: "New password must be a number between 6 to 8 digits" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password update failed", error: err.message });
  }
};

// ✅ Wishlist - Get
export const getUserWishlist = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("wishlist.productId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};

// ✅ Wishlist - Add
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid or missing productId" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyInWishlist = user.wishlist?.some(item => item?.productId?.toString() === productId);
    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push({ productId });
    await user.save();

    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// ✅ Wishlist - Remove
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter(item => item?.productId?.toString() !== productId);

    if (originalLength === user.wishlist.length) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    await user.save();
    res.json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
