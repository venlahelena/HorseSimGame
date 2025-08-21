const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  starterHorseChosen: { type: Boolean, default: false },

  horses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Horse' }],
  stable: {
    name: { type: String, default: "" },
    capacity: { type: Number, default: 10 },
    banner: { type: String, default: "" },
    avatar: { type: String, default: "" }
  },
  valley: {
    cleanliness: { type: Number, default: 0 },
    infrastructureLevel: { type: Number, default: 0 },
    economyHealth: { type: Number, default: 0 },
    unlockedAreas: [{ type: String }]
  },
  preferences: {
    theme: { type: String, default: "default" },
    notifications: { type: Boolean, default: true }
  },
  currency: { type: Number, default: 1000 }
});

module.exports = mongoose.model('User', userSchema);