const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { getMessages, createMessage } = require('../controllers/message');

router.route('/:conversationId').get(protect, getMessages);
router.route('/').post(protect, createMessage);

module.exports = router;
