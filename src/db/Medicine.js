const mongoose = require("mongoose");


const medicineSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true }, 
    time: { type: String, required: true }, 
    dosage: { type: String },
    frequency: { type: String, default: "daily" },
    remainingCount: { type: Number, default: 0 }, 
    totalCount: { type: Number, default: 60 }, 
    colorTag: { type: String, default: "#059669" },
    prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
