const mongoose = require("mongoose");


const medicineLogSchema = new mongoose.Schema(
  {
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    scheduledDate: { type: Date, required: true }, 
    taken: { type: Boolean, default: false },
    takenAt: { type: Date },
  },
  { timestamps: true }
);

medicineLogSchema.index({ medicine: 1, scheduledDate: 1 }, { unique: true });

module.exports = mongoose.model("MedicineLog", medicineLogSchema);
