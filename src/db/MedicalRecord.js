const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true }, 
    type: {
      type: String,
      enum: ["Lab Report", "Imaging", "Cardiology", "General", "Prescription", "Other"],
      required: true,
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    recordDate: { type: Date, required: true },
    fileUrl: { type: String, required: true }, 
    fileSizeBytes: { type: Number, default: 0 }, 
    icon: { type: String }, 
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
