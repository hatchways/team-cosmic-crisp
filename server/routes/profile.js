const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const {searchProfiles, getProfile, updateProfile} = require('../controllers/profile')

router.route("/").get((req, res, next) => {
    if (req.cookies.token) return protect(req, res, next);
    next();
}, searchProfiles);
router.route("/:id").get(getProfile);
router.route("/:id").patch(protect, updateProfile);


module.exports = router;