import express from "express";
import mongoose from "mongoose";
import { fuzzySearchProducts, getAllProducts, productbyid } from "../controllers/fuzzySController.js";

const router = express.Router();

router.get("/search", fuzzySearchProducts);
router.get("/all", getAllProducts);
router.get("/:id",productbyid);

// Add your other product routes here...
// router.get("/", getAllProducts);

export default router;