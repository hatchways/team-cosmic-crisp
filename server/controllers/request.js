const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Request = require('../models/Request');

// @route GET /requests
// @desc Get all requests of current users
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  try {
    const requests = await Request.find({ $or: [{ user: req.user.id }, { sitter: req.user.id }] })
      .populate('sitter', '-password')
      .populate('user', '-password');

    requests.map((request) => {
      if (request.user._id.toString() === req.user.id) request.user = undefined;
      else request.sitter = undefined;
      return request;
    });

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
  req.body.paid = undefined;
  //fields only accessable by sitter
  req.body.accepted = undefined;
  req.body.declined = undefined;
  try {
    const request = await Request.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /requests/:id/accept
// @desc accept or decline request by sitter
// @access Private
exports.updateRequestAccepted = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { accepted, declined } = req.body;
  try {
    const request = await Request.findOne({ _id: id });
    if (request.sitter.toString() === req.user.id) {
      request.accepted = accepted;
      request.declined = declined;
    }
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
