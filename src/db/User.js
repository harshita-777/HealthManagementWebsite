const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // store bcrypt hash only
    role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
    phone: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", "prefer_not_to_say"] },
    profileImage: { type: String, default: "" }, // avatar shown in header
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    height: { type: Number }, // cm
    weight: { type: Number }, // kg
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    emergencyContacts: [
      {
        name: String,
        relationship: String,
        phone: String,
      },
    ],
    location: {
      // used for "nearby hospitals" distance calculation
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
