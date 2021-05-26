const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  notifications: [
    {
      unread: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: "message",
      },
      title: String,
      body: String,
      date: {
        type: Date,
        default: Date.now,
      },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = Notifications = mongoose.model(
  "notifications",
  notificationsSchema
);
