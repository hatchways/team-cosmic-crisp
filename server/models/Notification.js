const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
  types: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
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

