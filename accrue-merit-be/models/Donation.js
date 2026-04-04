const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    donorName: { type: String, required: true },
    message: { type: String },
    amount: { type: Number, required: true },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);