const mongoose = require("mongoose");


const emergencyAlertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    triggeredAt: { type: Date, default: Date.now },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] }, 
    },
    status: { type: String, enum: ["active", "resolved", "cancelled"], default: "active" },
    nearestHospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    notifiedContacts: [{ type: String }], 
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

emergencyAlertSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
