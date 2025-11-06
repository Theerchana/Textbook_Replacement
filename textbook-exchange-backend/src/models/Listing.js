// src/models/Listing.js
const mongoose = require('mongoose');
const listingSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  condition: { type: String, enum: ['New','Like New','Good','Fair','Poor'], default: 'Good' },
  negotiable: { type: Boolean, default: false },
  exchangePossible: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  location: String,
  shippingAvailable: { type: Boolean, default: false },
  description: String,
  imageUrls: [String]
}, { timestamps: true });

listingSchema.index({ available: 1, price: 1 });
listingSchema.index({ location: 1, courseCode: 1 });

module.exports = mongoose.model('Listing', listingSchema);
