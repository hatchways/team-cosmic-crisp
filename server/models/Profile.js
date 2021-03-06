const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  isDogSitter: {
    type: Boolean,
    required: true,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: Number,
  address: String,
  city: String,
  description: String,
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
  availability: [String],
  price: Number,
  profilePhoto: String,
  coverPhoto: String,
  gallery: [String],
  reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    },
  ],
  notifications: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'notification'
    }
  ]
});

module.exports = Profile = mongoose.model('profile', profileSchema);
