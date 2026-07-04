const mongoose = require("mongoose");


const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true }, 
    address: { type: String },
    phone: { type: String },
    location: {
      
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, 
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    availableBeds: { type: Number, default: 0 },
    averageWaitMinutes: { type: Number, default: 0 }, 
    hasEmergency: { type: Boolean, default: false }, 
    image: { type: String },
  },
  { timestamps: true }
);

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
