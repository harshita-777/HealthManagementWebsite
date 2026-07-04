const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/health_management";
    await mongoose.connect(uri);
    console.log("MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
