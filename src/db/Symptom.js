const mongoose = require("mongoose");


const symptomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    bodyPart: { type: String }, // e.g. "chest", "head"
    severityWeight: { type: Number, default: 1 }, // used by the AI risk scoring logic
    isEmergencyFlag: { type: Boolean, default: false }, // e.g. Chest Pain, Shortness of Breath
  },
  { timestamps: true }
);

module.exports = mongoose.model("Symptom", symptomSchema);
