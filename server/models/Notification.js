const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  types: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail:{
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = Notification = mongoose.model("notification", notificationSchema);

