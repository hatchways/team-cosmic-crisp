const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  notifications: [
    {
      isNewNotification: {
        type: Boolean,
        default: true,
      },
      title: String,
      body: String,
      date: Date,
      from: {
        firstName: String,
        lastName: String,
      },
    },
  ],
});

module.exports = Notifications = mongoose.model(
  "notifications",
  notificationsSchema
);
