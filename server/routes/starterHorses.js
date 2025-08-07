const express = require('express');
const router = express.Router();
const starterHorseController = require('../controllers/starterHorseController');

router.get('/', starterHorseController.getStarterHorses);
router.get('/:id', starterHorseController.getStarterHorseById);
router.post('/choose', starterHorseController.chooseStarterHorse);

module.exports = router;