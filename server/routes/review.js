const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const {getReviews, createReview} = require('../controllers/review')

router.route("/:id").get(getReviews);
router.route("/:id").post(protect, createReview);

module.exports = router;