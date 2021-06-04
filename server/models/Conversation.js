const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }]
})

module.exports = Conversation = mongoose.model('conversation', conversationSchema);