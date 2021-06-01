const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation"
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
},
{ timestamps: true }
);

module.exports = Message = mongoose.model('message', messageSchema);