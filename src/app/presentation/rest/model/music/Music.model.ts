import mongoose from "mongoose";
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      defaultValue: "Unknown",
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    album: {
      defaultValue: "Unknown",
      type: String,
      required: false,
    },
    audio_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
