const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getRequests,
  postRequest,
  updateRequest,
  updateRequestAccepted,
  payRequest,
} = require('../controllers/request');

router.route('/').get(protect, getRequests);
router.route('/').post(protect, postRequest);
router.route('/:id').patch(protect, updateRequest);
router.route('/:id/accept').patch(protect, updateRequestAccepted);
router.route('/:id/pay').post(protect, payRequest);

module.exports = router;
