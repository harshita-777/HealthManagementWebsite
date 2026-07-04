const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, 

    title: { type: String, required: true }, 
    scheduledAt: { type: Date, required: true, index: true },
    type: { type: String, enum: ["video", "chat", "in_person"], default: "video" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    reasonForVisit: { type: String },
    colorTag: { type: String, default: "#059669" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
