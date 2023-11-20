const mongoose = require("mongoose");
const Track = require("./Music.model"); // Import the Book schema

const playlistSchema = new mongoose.Schema({
  name: {type: String, required: true},
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Track }],
  // Other author-related properties
});

module.exports = mongoose.model("Playlist", playlistSchema);