const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @route GET/profiles
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req,res,next) => {
  let query = {};
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);
      query = {_id : {$ne: user.profile}}
    }

    const profiles = await Profile
      .aggregate([
        { $match: { isDogSitter: true , price: {$exists: true}, city: {$exists: true} }}
      ])
    res.status(200).json({
      success: {
        users: profiles,
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

// @route GET /profiles/:id
//Search a single profile using ID
exports.getProfile = asyncHandler(async (req,res,next) => {
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