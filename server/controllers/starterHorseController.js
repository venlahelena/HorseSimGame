const StarterHorse = require("../models/StarterHorses");
const Horse = require("../models/Horse");
const User = require("../models/User");

exports.getStarterHorses = async (req, res) => {
  try {
    const horses = await StarterHorse.find();
    res.json(horses);
  } catch (err) {
    console.error("Error fetching starter horses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStarterHorseById = async (req, res) => {
  try {
    const horse = await StarterHorse.findById(req.params.id);
    if (!horse)
      return res.status(404).json({ message: "Starter horse not found" });
    res.json(horse);
  } catch (err) {
    console.error("Error fetching starter horse by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.chooseStarterHorse = async (req, res) => {
  const { starterHorseId, userId } = req.body;
  try {
    const starter = await StarterHorse.findById(starterHorseId);
    if (!starter)
      return res.status(404).json({ message: "Starter horse not found" });

    const newHorse = new Horse({
      name: starter.name,
      breed: starter.breed,
      age: starter.age,
      gender: starter.gender,
      stats: starter.stats,
      traits: {
        coatColor: starter.traits?.coatColor ?? "unknown",
        markings: starter.traits?.markings ?? "",
      },
      health: starter.health ?? 100,
      mood: starter.mood ?? "neutral",
      training: starter.training ?? { speed: 0, stamina: 0, agility: 0 },
      owner: userId,
      forSale: false,
    });
    await newHorse.save();

    await User.findByIdAndUpdate(userId, {
      $push: { horses: newHorse._id },
      $set: { starterHorseChosen: true },
    });

    // Fetch the updated user document
    const updatedUser = await User.findById(userId);

    res.status(201).json({ user: updatedUser, horse: newHorse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
