const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, default: 'Nhà hảo tâm ẩn danh' },
    username: { type: String },
    amount: { type: Number, required: true },
    message: { type: String },
    transactionId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);