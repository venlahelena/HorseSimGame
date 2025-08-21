const User = require("../models/User");
const Quest = require("../models/Quest");

// Get all quests for the logged-in user
exports.getUserQuests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("quests.quest");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.quests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quests" });
  }
};

// Assign a quest to the user
exports.assignQuest = async (req, res) => {
  try {
    const { questId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicate assignment
    if (user.quests.some(q => q.quest.equals(questId))) {
      return res.status(400).json({ message: "Quest already assigned" });
    }

    user.quests.push({ quest: questId, progress: 0, completed: false });
    await user.save();
    res.json(user.quests);
  } catch (err) {
    res.status(500).json({ message: "Error assigning quest" });
  }
};

// Update quest progress for the user
exports.updateQuestProgress = async (req, res) => {
  try {
    const { questId, progress } = req.body;
    const user = await User.findById(req.user._id).populate("quests.quest");
    if (!user) return res.status(404).json({ message: "User not found" });

    const questEntry = user.quests.find(q => q.quest._id.equals(questId));
    if (!questEntry) return res.status(404).json({ message: "Quest not found for user" });

    questEntry.progress = progress;
    // Check completion
    const questDef = await Quest.findById(questId);
    if (questDef && questEntry.progress >= questDef.objectives[0].goal) {
      questEntry.completed = true;
      // Grant reward (currency)
      user.currency += questDef.reward.currency || 0;
    }
    await user.save();
    res.json(questEntry);
  } catch (err) {
    res.status(500).json({ message: "Error updating quest progress" });
  }
};