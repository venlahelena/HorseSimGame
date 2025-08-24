const mongoose = require('mongoose');

const horseEventsSchema = new mongoose.Schema({
  horse: { type: mongoose.Schema.Types.ObjectId, ref: 'Horse', required: true },
  type: { type: String, required: true },
  detail: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HorseEvent', horseEventsSchema);