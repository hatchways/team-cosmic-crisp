const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @route GET /profiles
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req,res,next) => {
  try {
    const users = await User
      .find({})
      .populate({ path: "profile", match: { isDogSitter: { $eq: true }, price: {$exists: true}, city: {$exists: true}}})
      .select("-password");
    const userProfiles = users.filter(user => user.profile != null);
    res.status(200).json({
      success: {
        users: userProfiles,
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

// @route GET /profiles
//Search for all profiles excluding current user
exports.searchProtectedProfiles = asyncHandler(async (req,res,next) => {
  try {
    const users = await User
      .find({_id : {$ne: req.user.id}})
      .populate({ path: "profile", match: { isDogSitter: { $eq: true }, price: {$exists: true}, city: {$exists: true}}})
      .select("-password");
    const userProfiles = users.filter(user => user.profile != null);
    res.status(200).json({
      success: {
        users: userProfiles,
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

// @route GET /profiles/:id
//Search a single profile using ID
exports.searchProfile = asyncHandler(async (req,res,next) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid profile ID");
  }
  
  try {
    const profile = await Profile.findById(id);
    res.status(200).json({
      success: {
        profile
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }

})

// @route PATCH /profiles/:id
//Update a single profile using ID
exports.updateProfile = asyncHandler(async (req,res,next) => {
  const {id} = req.params;
  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid profile ID");
  }
  
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, profile, { new: true });
    res.status(200).json({
      success: {
        profile: updatedProfile
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})