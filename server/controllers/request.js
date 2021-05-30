const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Request = require('../models/Request');
const User = require('../models/User');

// @route GET /requests
// @desc Get all requests of current users
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  try {
    const userProfile = await User.findById(req.user.id).populate('profile');
    let requests = await Request.find({ $or: [{ user: req.user.id }, { sitter: userProfile.profile._id }] })
      .sort({ start: 'desc' })
      .populate('sitter', '-password');

    let promises = requests.map(async (request) => {
      if (request.sitter._id.toString() === userProfile.profile._id.toString()) {
        const otherUser = await User.findById(request.user).populate('profile');
        request.sitter = otherUser.profile;
        request.user = undefined;
      }
      return request;
    });

    requests = await Promise.all(promises);

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route POST /requests
// @desc Create new request for the user
// @access Private
exports.postRequest = asyncHandler(async (req, res, next) => {
  const { sitter, start, end } = req.body;
  if (!sitter) {
    res.status(400);
    throw new Error('No sitter provided');
  }
  const newRequest = new Request({
    user: req.user.id,
    sitter,
    start,
    end,
  });

  try {
    await newRequest.save();
    res.status(201).json({ request: newRequest });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /requests
// @desc update request details
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //removing paid field for security reasons
  delete req.body.paid;
  //fields only accessable by sitter
  delete req.body.accepted;
  delete req.body.declined;
  try {
    const request = await Request.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /requests/accept/:id
// @desc accept or decline request by sitter
// @access Private
exports.updateRequestAccepted = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { accepted, declined } = req.body;
  try {
    const request = await Request.findById(id);
    const user = await User.findById(req.user.id).populate('profile');
    // only sitter can accept or decline
    if (request.sitter.toString() === user.profile._id.toString()) {
      request.accepted = accepted;
      request.declined = declined;
    }
    await request.save();
    const otherUser = await User.findById(request.user).populate('profile');
    request.sitter = otherUser.profile;
    request.user = undefined;
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
