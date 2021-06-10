const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Review = require('../models/Review');

// @route GET/reviews/:id
// Get all reviews for a single user
exports.getReviews = asyncHandler(async (req,res,next) => {
  const profileId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }
  
  try {
    const sitterProfile = await Profile.findById(profileId).populate('reviews');
    res.status(200);
    res.json({
      success: {
        reviews: sitterProfile.reviews,
      }
    })
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

// @route POST/reviews/:id
//Create a new review
exports.createReview = asyncHandler(async (req,res,next) => {
  const userId = req.user.id;
  const sitterId = req.params.id;
  const review = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  try {
    const user = await User.findById(userId).populate('profile');
    const sitterProfile = await Profile.findById(sitterId);

    const newReview = new Review({
      ...review,
      creator: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        profilePhoto: user.profile.profilePhoto,
      }
    });
    sitterProfile.reviews.push(newReview._id); 
    await sitterProfile.save();
    await newReview.save();

    const updatedProfile = await Profile.findById(sitterId).populate('reviews');
    res.status(201).json({
      success: {
        profile: updatedProfile
      }
    });
  } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
})