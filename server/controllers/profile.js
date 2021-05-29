const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @route GET/profiles
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req,res,next) => {
  let sitterProfiles;

  try {
    const profiles = await Profile.aggregate([
        { $match: { isDogSitter: true , price: {$exists: true}, city: {$exists: true} }}
      ])

    if (req.user) {
      const currentUser = await User.findById(req.user.id);
      sitterProfiles = profiles.filter((profile) => !(currentUser.profile.equals(profile._id)));
    } else {
      sitterProfiles = profiles;
    }      

    res.status(200).json({
      success: {
        profiles: sitterProfiles,
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
  console.log('profile in server is ', profile);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid profile ID");
  }
  
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, profile, { new: true });
    console.log('updated Profile is ', updatedProfile);
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