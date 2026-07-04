const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true }, 
    profileImage: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isAvailableNow: { type: Boolean, default: false },
    nextAvailableSlot: { type: Date },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    consultationFee: { type: Number, default: 0 },
    bio: { type: String },
    yearsExperience: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
