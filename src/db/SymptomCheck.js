const mongoose = require("mongoose");


const symptomCheckSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    selectedSymptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Symptom", required: true }],

    riskLevel: { type: String, enum: ["Low", "Moderate", "High"], required: true },
    riskLabel: { type: String }, 
    possibleConditions: [{ type: String }], 
    advice: { type: String },

    aiModelVersion: { type: String, default: "HealthAI v3" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SymptomCheck", symptomCheckSchema);
