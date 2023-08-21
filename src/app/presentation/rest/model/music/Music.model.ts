import mongoose from "mongoose";
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    album_id: [{ type: Schema.Types.ObjectId, ref: "Album" }],
    duration: {
      type: Number,
      required: true,
    },
    audio_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
