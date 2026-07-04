const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String },
    type: {
      type: String,
      enum: ["appointment_reminder", "medicine_reminder", "symptom_result", "emergency", "system"],
      default: "system",
    },
    isRead: { type: Boolean, default: false },
    relatedId: { type: mongoose.Schema.Types.ObjectId }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
