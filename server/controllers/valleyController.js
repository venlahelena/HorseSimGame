const User = require('../models/User');

exports.getValley = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.valley);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching valley state' });
  }
};

exports.updateValley = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { 'valley': updates } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.valley);
  } catch (err) {
    res.status(500).json({ message: 'Error updating valley state' });
  }
};