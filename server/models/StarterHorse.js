const mongoose = require('mongoose');

const starterHorseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  stats: {
    speed: { type: Number, required: true },
    stamina: { type: Number, required: true },
    agility: { type: Number, required: true },
  },
  traits: {
    coatColor: { type: String, required: true },
    markings: { type: String, required: true },
  },
  description: { type: String },
});

module.exports = mongoose.model('StarterHorse', starterHorseSchema);