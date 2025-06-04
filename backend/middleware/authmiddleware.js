import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Token:", token); // 👈

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded ID:", decoded.id); // 👈

      const user = await userModel.findById(decoded.id).select("-password");
      console.log("Found User:", user); // 👈

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("JWT error:", error.message); // 👈
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};
