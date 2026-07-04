const mongoose = require("mongoose");

const vitalSignSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    recordedAt: { type: Date, required: true, default: Date.now, index: true },

    heartRate: { type: Number }, 
    bloodPressure: {
      systolic: { type: Number },
      diastolic: { type: Number },
    },
    temperature: { type: Number }, 
    spo2: { type: Number }, 
    respirationRate: { type: Number },
    sleepHours: { type: Number },

    source: { type: String, enum: ["manual", "wearable", "device"], default: "manual" },
  },
  { timestamps: true }
);


vitalSignSchema.index({ user: 1, recordedAt: -1 });

module.exports = mongoose.model("VitalSign", vitalSignSchema);
