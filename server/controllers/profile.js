const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Profile = require('../models/Profile');

// @route GET /profile
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req,res,next) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({
          success: {
            profiles
          }
        });
      } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }
})

// @route POST /profile
//Create a new profile
exports.createProfile = asyncHandler(async (req,res,next) => {
    const profile = req.body;
    const newProfile = new Profile({
        ...profile
    });

    try {
        await newProfile.save();
        res.status(201).json({
          success: {
            profile: newProfile
          }
        });
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }
})

// @route GET /profile/:id
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

// @route PATCH /profile/:id
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