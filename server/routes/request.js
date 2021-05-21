const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getRequests, postRequest, updateRequest } = require('../controllers/request');

router.route('/').get(protect, getRequests);
router.route('/').post(protect, postRequest);
router.route('/:id').patch(protect, updateRequest);

module.exports = router;
