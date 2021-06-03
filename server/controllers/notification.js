const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Notification = require('../models/Notification');

// @route GET /notification
// @access Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  try{
    const notifications = await Notification.find({user:id});
    res.status(200).json({
      notifications
    })} catch(error){
      res.status(500);
      throw new Error(error.message);
    }
});

// @route POST /notification
// @access Private
exports.postNotification = asyncHandler(async (req, res, next) => {
  const { types,title,description,thumbnail } = req.body;
  const { id } = req.user;
  const newNotification = new Notification({
    user:id,
    types,
    title,
    description,
    thumbnail
  });

  try {
    await newNotification.save();
    res.status(201).json({ notification: newNotification });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /notificaiton/:id
// @access Private
exports.updateNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const notification = req.body;
  try{
    const result = await Notification.findByIdAndUpdate(id, notification, {new:true});
    res.status(200)
      .json({notification:result})
  } catch(error){
    res.status(500);
    throw new Error(error.message);
  }
});

// @route get /notification/unread
// @access Private
exports.getUnreadNotificaiton = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  try{
    const notifications = await Notification.find({user:id, read:false});
    res.status(200).json({
      notifications
    })}catch(error){
      res.status(500);
      throw new Error(error.message);
    }
});

exports.setReadNotifications = asyncHandler(async (req, res, next) => {
  try{
    const updatedNotifications = await Notification.updateMany(
      {read: false}, {read: true});
    res.status(200).json({
      message: 'Notification update successed'
    })
  } catch(error){
    res.status(500);
    throw new Error(error.message);
  }
})
