const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Review = require('../models/Review');

// @route GET/reviews/:id
//Search for all reviews for single user
exports.searchReviews = asyncHandler(async (req,res,next) => {
    // const {id} = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     res.status(400);
    //     throw new Error("Invalid user ID");
    //   }

    try {
        const sitterProfile = Profile.find({});
        res.status(200);
        res.json({
            success: {
              sitterProfile
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

  try {
    const user = await User.findById(userId).populate('profile');
    const sitterProfile = await Profile.findById(sitterId);

    const newReview = new Review({
      ...review,
      creator: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
      }
    });

    sitterProfile.reviews.push(newReview._id); 

    await sitterProfile.save();
    await newReview.save();
    res.status(201).json({
      success: {
        review: newReview
      }
    });
  } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
})