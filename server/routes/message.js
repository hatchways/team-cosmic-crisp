const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { getMessages, createMessage, setMessageToSeen } = require('../controllers/message');

router.route('/:conversationId').get(protect, getMessages);
router.route('/').post(protect, createMessage);
router.route('/:conversationId').patch(protect, setMessageToSeen);

module.exports = router;
