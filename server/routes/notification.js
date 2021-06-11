const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getNotifications, postNotification, updateNotification, getUnreadNotificaiton, setReadNotifications} = require('../controllers/notification');

router.route('/').get(protect, getNotifications);
router.route('/').post(protect, postNotification);
router.route('/:id').patch(protect, updateNotification);
router.route('/unread').get(protect, getUnreadNotificaiton);
router.route('/unread').post(protect, setReadNotifications);

module.exports = router;
