import express from "express";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAddresses).post(protect, addAddress);
router.route("/:id").put(protect, updateAddress).delete(protect, deleteAddress);
router.route("/:id/default").patch(protect, setDefaultAddress);

export default router;
