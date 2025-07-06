const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['movie', 'concert', 'train'], required: true },
  description: String,
  date: { type: Date, required: true },
  time: String,
  price: { type: Number, required: true },
  totalSeats: { type: Number, default: 100 },
  bookedSeats: { type: [Number], default: [] },
  location: String,
  source: String,       // for trains
  destination: String,  // for trains
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
