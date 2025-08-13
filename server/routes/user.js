const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userProfileController = require('../controllers/userProfileController');

router.get('/profile', auth, userProfileController.getProfile);
router.put('/profile', auth, userProfileController.updateProfile);

module.exports = router;