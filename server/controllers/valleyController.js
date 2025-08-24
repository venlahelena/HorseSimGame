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

exports.repairBarn = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cost = 200;
    if (user.currency < cost) {
      return res.status(400).json({ message: "Not enough currency" });
    }

    user.currency -= cost;
    user.valley.barnRepaired = true;
    user.valley.unlockedAreas.push("barn");
    await user.save();

    res.json({ valley: user.valley, currency: user.currency });
  } catch (err) {
    res.status(500).json({ message: "Error repairing barn" });
  }
};

exports.buildTrainingRing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cost = 300;
    if (user.currency < cost) {
      return res.status(400).json({ message: "Not enough currency" });
    }
    if (user.valley.trainingRingBuilt) {
      return res.status(400).json({ message: "Training ring already built" });
    }

    user.currency -= cost;
    user.valley.trainingRingBuilt = true;
    user.valley.unlockedAreas.push("training_ring");
    await user.save();

    res.json({ valley: user.valley, currency: user.currency });
  } catch (err) {
    res.status(500).json({ message: "Error building training ring" });
  }
};