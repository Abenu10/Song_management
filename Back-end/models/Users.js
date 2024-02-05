const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
 profile: {
  type: String,
  default: "https://res.cloudinary.com/dnizoc474/image/upload/v1694079691/blank-profile-picture_hc8crz.png"
 },
 
});

module.exports = User = mongoose.model('user', UserSchema);
