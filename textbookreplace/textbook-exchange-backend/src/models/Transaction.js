// src/models/Transaction.js
const mongoose = require('mongoose');
const txSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: Number,
  status: { type: String, enum: ['requested','reserved','shipped','completed','cancelled','disputed'], default: 'requested' },
  paymentMethod: String,
  pickupDetails: String
}, { timestamps: true });

txSchema.index({ listing: 1 });
txSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', txSchema);
