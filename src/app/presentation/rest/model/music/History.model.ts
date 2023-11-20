import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    audio_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
