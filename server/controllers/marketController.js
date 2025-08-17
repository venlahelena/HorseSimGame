const Horse = require('../models/Horse');

exports.listMarketHorses = async (req, res) => {
  try {
    const horses = await Horse.find({ forSale: true }).populate('owner', 'username');
    res.json(horses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch market horses', error: err.message });
  }
};