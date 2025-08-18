const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const { validateHorsePut } = require('../middleware/validation');

router.post('/:id/feed', horseController.feedHorse);
router.post('/:id/groom', horseController.groomHorse);
router.post('/:id/train', horseController.trainHorse);

router.get('/:id/event', horseController.getHorseEvents);

router.get('/', horseController.listHorses);
router.post('/', horseController.createHorse);
router.put('/:id', validateHorsePut, horseController.updateHorse);
router.delete('/:id', horseController.deleteHorse);
router.get('/:id', horseController.getHorseById);

module.exports = router;