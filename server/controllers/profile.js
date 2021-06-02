const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @route GET/profiles
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req, res, next) => {
  let sitterProfiles;
  const { city, date } = req.query;
  const weekDays = ['sun', 'mon', 'tues', 'wed', 'thrus', 'fri', 'sat'];
  let profiles;
  try {
    //if no filter is provided i.e city and date is undefined
    if (city === 'undefined' && date === 'undefined') {
      profiles = await Profile.aggregate([
        {
          $match: { isDogSitter: true, price: { $exists: true }, city: { $exists: true } },
        },
      ]);
    } else {
      // if either or one filter is provided
      if (city !== 'undefined' && date !== 'undefined') {
        let dayOfWeek = weekDays[new Date(date).getDay()];
        profiles = await Profile.aggregate([
          {
            $match: {
              isDogSitter: true,
              isAvailable: true,
              price: { $exists: true },
              city: { $regex: city, $options: 'i' },
              availability: { $in: [dayOfWeek] },
            },
          },
        ]);
      } else if (city !== 'undefined' && date === 'undefined')
        profiles = await Profile.aggregate([
          {
            $match: {
              isDogSitter: true,
              isAvailable: true,
              price: { $exists: true },
              city: { $regex: city, $options: 'i' },
            },
          },
        ]);
      else if (date !== 'undefined' && city === 'undefined') {
        let dayOfWeek = weekDays[new Date(date).getDay()];
        profiles = await Profile.aggregate([
          {
            $match: {
              isDogSitter: true,
              isAvailable: true,
              price: { $exists: true },
              city: { $exists: true },
              availability: { $in: [dayOfWeek] },
            },
          },
        ]);
      }
    }

    if (req.user) {
      const currentUser = await User.findById(req.user.id);
      sitterProfiles = profiles.filter((profile) => !currentUser.profile.equals(profile._id));
    } else {
      sitterProfiles = profiles;
    }

    res.status(200).json({
      success: {
        profiles: sitterProfiles,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route GET /profiles/:id
//Search a single profile using ID
exports.getProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid profile ID');
  }

  try {
    const profile = await Profile.findById(id);
    res.status(200).json({
      success: {
        profile,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /profiles/:id
//Update a single profile using ID
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid profile ID');
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, profile, { new: true });
    res.status(200).json({
      success: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
