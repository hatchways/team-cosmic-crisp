const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Message = require('../models/Message');

// @route GET/conversations
//Get all conversations for a user
exports.getConversations = asyncHandler(async (req,res,next) => {
  try {
    const user = await User.findById(req.user.id);
    Conversation.find(
      {
      participants: { $all: [user.profile._id] },
      },
      async (err, conversations) => {
        if (err) console.log (err);
        const conversationData = await Promise.all(
          conversations.map(async conversation => {
            return {
              conversationId: conversation._id,
              recipient: await Profile.findById(
                conversation.participants.filter(participant => {
                  return participant !== user.profile._id.toString();
                })[0]
                ).select("firstName lastName profilePhoto")
              }
          })
        )
        res.status(200).json({
          success: {
            conversations: conversationData
          }
        })
      }
    )
  } catch(err) {
    res.status(500);
    throw new Error(error.message);
  }
})

// @route POST/coversations
//Create a conversation
exports.createConversation = asyncHandler(async (req,res,next) => {
  const newConverstaion = new Conversation({
    participants: [req.body.senderId, req.body.receiverId]
  })
  try {
    const savedConversation = await newConverstaion.save();
    res.status(201).json({
      success: {
        conversation: savedConversation,
      }
    })
  } catch(err) {
    res.status(500);
    throw new Error(error.message);
  }
})