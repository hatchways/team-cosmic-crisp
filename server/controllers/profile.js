const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @route GET/profiles
//Search for all profiles
exports.searchProfiles = asyncHandler(async (req, res, next) => {
  const { city, startDate, endDate } = req.query;
  let sitterProfiles;  
  let profiles;

  const treatAsUTC = (date) => {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  const daysBetween = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
  }

  const daysServiceRequested = (startDate, dateDiff) => {
    const weekDays = ['sun', 'mon', 'tues', 'wed', 'thrus', 'fri', 'sat'];
    const offset = new Date(startDate).getDay();
    const result = [];

    if (dateDiff >= 7) {
      return weekDays;
    } 
    else {
      for (let i = 0; i <= dateDiff; i++) {
        result.push(weekDays[(i + offset) % 7]);
      }
      return result;
    }
  }
  
  try {
    //if no filter is provided i.e city and date is undefined
    if (city === 'undefined' && startDate === 'undefined' && endDate === 'undefined') {
      profiles = await Profile.aggregate([
        {
          $match: { isDogSitter: true, price: { $exists: true }, city: { $exists: true } },
        },
      ]);
    } else {
      // if either or one filter is provided
      if (city !== 'undefined' && startDate !== 'undefined' && endDate !== 'undefined') {
        const dateDiff = daysBetween(startDate, endDate);
        const serviceDays = daysServiceRequested(startDate, dateDiff)
        profiles = await Profile.aggregate([
          {
            $match: {
              isDogSitter: true,
              isAvailable: true,
              price: { $exists: true },
              city: { $regex: city, $options: 'i' },
              availability: { $all: serviceDays },
            },
          },
        ]);
      } else if (city !== 'undefined' && startDate === 'undefined' && endDate === 'undefined')
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
      else if (startDate !== 'undefined' && endDate !== 'undefined' && city === 'undefined') {
        const dateDiff = daysBetween(startDate, endDate);
        const serviceDays = daysServiceRequested(startDate, dateDiff)
        profiles = await Profile.aggregate([
          {
            $match: {
              isDogSitter: true,
              isAvailable: true,
              price: { $exists: true },
              city: { $exists: true },
              availability: { $all: serviceDays },
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
