const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
  //   Total_like: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  //   total_likes: {
  //     type: Number,
  //     default: 0,
  //   },
  //   User_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'user',
  //     required: true,
  //   },
});

// Create a text index on the title, artist, album, and genre fields
SongSchema.index({title: 'text', artist: 'text', album: 'text', genre: 'text'});

module.exports = Song = mongoose.model('songs', SongSchema);
