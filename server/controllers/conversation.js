const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Conversation = require('../models/Conversation');
const User = require('../models/User');

// @route GET/conversations
//Get all conversations for a user
exports.getConversations = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const conversations = await Conversation.find({ participants: { $all: [user.profile] } })
      .populate({
        path: 'participants',
        match: {
          _id: { $ne: user.profile },
        },
        select: 'firstName lastName profilePhoto',
      })
      .populate({
        path: 'messages',
        options: {
          limit: 1,
          sort: { createdAt: -1 },
        },
      });

    const filteredConversations = conversations.map((conversation) => {
      return {
        conversationId: conversation._id,
        recipient: {
          _id: conversation.participants[0]._id,
          firstName: conversation.participants[0].firstName,
          lastName: conversation.participants[0].lastName,
          profilePhoto: conversation.participants[0].profilePhoto,
        },
        lastMessage: conversation.messages[0]?.content || '',
        seen: conversation.messages[0]?.read || true,
      };
    });

    res.status(200).json({
      success: {
        conversations: filteredConversations,
      },
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @route POST/coversations
//Create a conversation
exports.createConversation = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const conversation = await Conversation.findOne({
      participants: { $all: [req.body.senderId, req.body.receiverId] },
    })
      .populate({
        path: 'participants',
        match: {
          _id: { $ne: user.profile },
        },
        select: 'firstName lastName profilePhoto',
      })
      .populate({
        path: 'messages',
        options: {
          limit: 1,
          sort: { createdAt: -1 },
        },
      });

    if (!conversation) {
      const newConverstaion = new Conversation({
        participants: [req.body.senderId, req.body.receiverId],
      });
      const savedConversation = await newConverstaion.save().then((doc) =>
        doc
          .populate({
            path: 'participants',
            match: {
              _id: { $ne: user.profile },
            },
            select: 'firstName lastName profilePhoto',
          })
          .execPopulate(),
      );

      res.json({
        success: {
          conversation: {
            conversationId: savedConversation._id,
            recipient: {
              _id: savedConversation.participants[0]._id,
              firstName: savedConversation.participants[0].firstName,
              lastName: savedConversation.participants[0].lastName,
              profilePhoto: savedConversation.participants[0].profilePhoto,
            },
            lastMessage: '',
            seen: true,
          },
        },
      });
    } else {
      res.json({
        success: {
          conversation: {
            conversationId: conversation._id,
            recipient: {
              _id: conversation.participants[0]._id,
              firstName: conversation.participants[0].firstName,
              lastName: conversation.participants[0].lastName,
              profilePhoto: conversation.participants[0].profilePhoto,
            },
            lastMessage: conversation.messages[0]?.content || '',
            seen: conversation.messages[0]?.read || true,
          },
        },
      });
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
