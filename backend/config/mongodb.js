import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // No options needed for v4+

    mongoose.connection.on('connected', () => {
      console.log("✅ MongoDB Connected");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
};

export default connectDB;
