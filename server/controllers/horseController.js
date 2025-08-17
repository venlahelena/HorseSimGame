const Horse = require("../models/Horse");
const HorseEvent = require("../models/HorseEvents");

// Helper to log horse events
async function logHorseEvent(horseId, type, detail) {
  await HorseEvent.create({ horse: horseId, type, detail });
}

// List all horses
exports.listHorses = async (req, res) => {
  try {
    const horses = await Horse.find();
    res.json(horses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get horse by ID
exports.getHorseById = async (req, res) => {
  try {
    const horse = await Horse.findById(req.params.id);
    if (!horse) return res.status(404).json({ message: "Horse not found" });
    res.json(horse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new horse
exports.createHorse = async (req, res) => {
  try {
    const horse = new Horse(req.body);
    await horse.save();
    res.status(201).json(horse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update horse by ID
exports.updateHorse = async (req, res) => {
  try {
    const horse = await Horse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!horse) return res.status(404).json({ message: "Horse not found" });
    res.json(horse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete horse by ID
exports.deleteHorse = async (req, res) => {
  try {
    const horse = await Horse.findByIdAndDelete(req.params.id);
    if (!horse) return res.status(404).json({ message: "Horse not found" });
    res.json({ message: "Horse deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Feed horse
exports.feedHorse = async (req, res) => {
  try {
    const { feedType } = req.body;
    const horse = await Horse.findById(req.params.id);
    if (!horse) return res.status(404).json({ message: "Horse not found" });

    if (feedType === "hay") {
      horse.health = Math.min(horse.health + 5, 100);
      horse.mood = "content";
    } else if (feedType === "grain") {
      horse.health = Math.min(horse.health + 2, 100);
      horse.mood = "energetic";
    }
    await horse.save();
    await logHorseEvent(horse._id, "feed", `Fed with ${feedType}`);
    res.json(horse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Groom horse
exports.groomHorse = async (req, res) => {
  try {
    const horse = await Horse.findById(req.params.id);
    if (!horse) return res.status(404).json({ message: "Horse not found" });

    horse.mood = "happy";
    await horse.save();
    await logHorseEvent(horse._id, "groom", "Groomed");
    res.json(horse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Train horse
exports.trainHorse = async (req, res) => {
  try {
    const { stat } = req.body; // "speed", "stamina", "agility"
    const horse = await Horse.findById(req.params.id);
    if (!horse) return res.status(404).json({ message: "Horse not found" });

    if (stat && horse.training && horse.training[stat] !== undefined) {
      horse.training[stat] += 1;
      horse.mood = "tired";
      horse.health = Math.max(horse.health - 2, 0);
      await horse.save();
      await logHorseEvent(horse._id, "train", `Trained ${stat}`);
      res.json(horse);
    } else {
      res.status(400).json({ message: "Invalid training stat" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get horse events
exports.getHorseEvents = async (req, res) => {
  try {
    const events = await HorseEvent.find({ horse: req.params.id }).sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    console.error("HorseEvent error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};
