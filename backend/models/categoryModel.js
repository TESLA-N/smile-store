import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: String
});

const categoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
