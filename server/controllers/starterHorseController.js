const StarterHorse = require('../models/StarterHorses');
const Horse = require('../models/Horse');
const User = require('../models/User');

exports.getStarterHorses = async (req, res) => {
  try {
    const horses = await StarterHorse.find();
    res.json(horses);
  } catch (err) {
    console.error('Error fetching starter horses:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStarterHorseById = async (req, res) => {
  try {
    const horse = await StarterHorse.findById(req.params.id);
    if (!horse) return res.status(404).json({ message: 'Starter horse not found' });
    res.json(horse);
  } catch (err) {
    console.error('Error fetching starter horse by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.chooseStarterHorse = async (req, res) => {
  const { userId, starterHorseId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const starter = await StarterHorse.findById(starterHorseId);
    if (!starter) return res.status(404).json({ message: 'Starter horse not found' });

    const existing = await Horse.findOne({ owner: userId });
    if (existing) {
      return res.status(400).json({ message: 'User already owns a horse' });
    }

    const newHorse = new Horse({
      name: starter.name,
      breed: starter.breed,
      age: starter.age,
      gender: starter.gender,
      stats: starter.stats,
      traits: starter.traits,
      description: starter.description,
      owner: userId,
      forSale: false,
    });

    await newHorse.save();

    // Add the new horse to the user's horses array if needed
    user.horses.push(newHorse._id);
    await user.save();

    // Fetch updated user with horses populated
    const updatedUser = await User.findById(userId)
      .populate("horses")
      .select("-password");

    res.status(201).json({
      message: 'Starter horse chosen!',
      horse: newHorse,
      user: updatedUser
    });
  } catch (err) {
    console.error('Error choosing starter horse:', err);
    res.status(500).json({ message: 'Server error' });
  }
};