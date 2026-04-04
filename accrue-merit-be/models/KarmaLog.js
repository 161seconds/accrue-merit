const mongoose = require('mongoose');

const KarmaLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['duc', 'toi'], required: true },
    action: { type: String, required: true },
    points: { type: Number, required: true },
    icon: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('KarmaLog', KarmaLogSchema);