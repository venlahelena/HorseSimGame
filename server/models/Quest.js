const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: { type: String, default: "generic" }, // e.g. "valley", "horse", "collect", "win"
  objectives: [{
    key: String, // e.g. "cleanliness", "win_race"
    goal: Number,
    progressType: { type: String, default: "number" } // or "boolean", "item"
  }],
  reward: {
    currency: { type: Number, default: 0 },
    items: [{ type: String }],
    unlock: { type: String }
  },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quest" }]
});

module.exports = mongoose.model('Quest', questSchema);