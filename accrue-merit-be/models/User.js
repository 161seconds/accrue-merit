const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "☸" },

    stats: {
        ducTotal: { type: Number, default: 0 },
        toiTotal: { type: Number, default: 0 },
        moCount: { type: Number, default: 0 },
        streak: { type: Number, default: 1 }
    },

    settings: {
        equippedTitleId: { type: String, default: "t1" },
        appFont: { type: String, default: "'Noto Serif', serif" }
    },

    unlockedTitles: [{ type: String }],

    createdAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);