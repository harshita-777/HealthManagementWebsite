const mongoose = require("mongoose");


const consultationSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

    mode: { type: String, enum: ["video", "chat"], required: true },
    roomId: { type: String }, 
    startedAt: { type: Date },
    endedAt: { type: Date },

    doctorNotes: { type: String },
    diagnosis: { type: String },
    prescriptions: [
      {
        medicineName: String,
        dosage: String,
        frequency: String,
        durationDays: Number,
        instructions: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);
