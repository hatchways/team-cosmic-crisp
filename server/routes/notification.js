const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getNotifications, postNotification, updateNotification, getUnreadNotificaiton} = require('../controllers/notification');

router.route('/').get(protect, getNotifications);
router.route('/').post(protect, postNotification);
router.route('/:id').patch(protect, updateNotification);
router.route('/unread').get(protect, getUnreadNotificaiton);

module.exports = router;
