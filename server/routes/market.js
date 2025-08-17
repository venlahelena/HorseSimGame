const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/horses', marketController.listMarketHorses);

module.exports = router;