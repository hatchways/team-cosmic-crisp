const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getRequests, postRequest, updateRequest, updateRequestAccepted } = require('../controllers/request');

router.route('/').get(protect, getRequests);
router.route('/').post(protect, postRequest);
router.route('/:id').patch(protect, updateRequest);
router.route('/:id/accept').patch(protect, updateRequestAccepted);

module.exports = router;
