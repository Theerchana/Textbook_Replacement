// src/routes/transactions.js
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Listing = require('../models/Listing');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Reserve a listing: POST /api/transactions/:listingId/reserve
router.post('/:listingId/reserve', auth, async (req, res) => {
  const listingId = req.params.listingId;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // atomically set available=false only if currently available
    const listing = await Listing.findOneAndUpdate(
      { _id: listingId, available: true },
      { $set: { available: false } },
      { new: true, session }
    );
    if (!listing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: 'Listing already reserved or not available' });
    }

    const txDocs = await Transaction.create([{
      listing: listing._id,
      buyer: req.user._id,
      seller: listing.seller,
      price: listing.price,
      status: 'reserved'
    }], { session });

    await session.commitTransaction();
    session.endSession();
    res.json(txDocs[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
