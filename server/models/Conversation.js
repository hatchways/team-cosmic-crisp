const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }]
})

module.exports = Conversation = mongoose.model('conversation', conversationSchema);