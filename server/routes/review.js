const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const {searchReviews, createReview} = require('../controllers/review')

router.route("/:id").get(searchReviews);
router.route("/:id").post(protect, createReview);

module.exports = router;