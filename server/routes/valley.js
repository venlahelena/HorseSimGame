const express = require('express');
const router = express.Router();
const valleyController = require('../controllers/valleyController');
const auth = require('../middleware/auth');

// Get valley state
router.get('/', auth, valleyController.getValley);

// Update valley state
router.put('/', auth, valleyController.updateValley);

// Repair barn
router.post('/repair-barn', auth, valleyController.repairBarn);

router.post("/build-training-ring", auth, valleyController.buildTrainingRing);

module.exports = router;