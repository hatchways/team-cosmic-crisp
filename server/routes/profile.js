const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const {searchProfiles, createProfile, searchProfile, updateProfile} = require('../controllers/profile')

router.route("/").get(searchProfiles);
router.route("/").post(protect, createProfile);
router.route("/:id").get(searchProfile);
router.route("/:id").patch(protect, updateProfile);


module.exports = router;