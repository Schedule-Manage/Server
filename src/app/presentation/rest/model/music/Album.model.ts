import mongoose from "mongoose";
const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    cover_image_url: {
      type: String,
      required: true,
    },
    artist_id: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
