const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Request = require('../models/Request');

// @route GET /requests
// @desc Get all requests of current users
// @access Private
exports.getRequests = asyncHandler(async (req,res,next) => {
    try {
        const requests = await Request.find({user: req.user.id}).populate('sitter');
        res.status(200).json({requests});
      } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }
})

// @route POST /requests
// @desc Create new request for the user
// @access Private
exports.postRequest = asyncHandler(async (req,res,next) => {
    const {sitter,start,end} = req.body;
    const newRequest = new Request({
        user: req.user.id,
		sitter,
		start,
		end
    });

    try {
        await newRequest.save();
        res.status(201).json({request:newRequest});
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }
})

// @route UPDATE /requests
// @desc update request details
// @access Private
exports.updateRequest = asyncHandler(async (req,res,next) => {
	const id = req.params.id;
    const {sitter,start,end, accepted, declined, paid } = req.body;
    try {
	  const request = await Request.findById(id);
	  //checking if request is updated by same user
	  if(request.user.equals(req.user.id)){
		// changing only fields given by the user
		request.sitter = sitter? sitter: request.sitter;
		request.start = start? start: request.start;
		request.end = end? end: request.end;
		request.accepted = accepted? accepted: request.accepted;
		request.declined = declined? declined: request.declined;
		request.paid = paid? paid: request.paid;

		await request.save();
		res.status(200).json({request});
	  }else{
		res.status(400);
		throw new Error("Request not found");
	  }
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
})
