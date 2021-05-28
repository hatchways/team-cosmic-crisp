const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const Profile = require('../models/Profile');

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const profile = new Profile({
    firstName,
    lastName
  })

  const user = await User.create({
    email,
    password,
    profile: profile._id
  });
  const newProfile = await profile.save();
  
  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          email: user.email,
          registerDate: user.registerDate,
          profile: newProfile._id,
        },
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('profile');

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(200).json({
      success: {  
        user: {
          id: user._id,
          email: user.email,
          registerDate: user.registerDate,
          profile: user.profile._id,
        },
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('profile');

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        email: user.email,
        registerDate: user.registerDate,
        profile: user.profile._id,
      }
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});
