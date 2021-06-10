const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// @route GET /messages/:conversationId
//Get all messages for a conversation
exports.getMessages = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.conversationId;
  try {
    const messages = await Conversation.findById(conversationId).populate('messages');
    res.status(200).json({
      success: {
        messages: messages.messages,
      },
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @route POST /messages
//Create a message
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, content } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const conversation = await Conversation.findById(conversationId);
    const newMessage = new Message({
      content,
      sender: user.profile,
    });
    conversation.messages = [...conversation.messages, newMessage._id];
    const savedMessage = await newMessage.save();
    await conversation.save();
    res.status(201).json({
      success: {
        message: savedMessage,
      },
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @route PATCH /messages/:conversationId
//Set message status to seen
exports.setMessageToSeen = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      match: { sender: { $ne: user.profile } },
      options: {
        limit: 1,
        sort: { createdAt: -1 },
      },
    });
    await Message.findOneAndUpdate({ _id: conversation.messages[0]._id }, { $set: { read: true } });
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500);
    throw new Error(err.message);
  }
});
