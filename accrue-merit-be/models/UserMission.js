const mongoose = require('mongoose');

const UserMissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    kanban: [
        {
            missionId: { type: String },
            status: { type: String, enum: ['todo', 'doing', 'done'] }
        }
    ],

    date: { type: String }, // Chuỗi YYYY-MM-DD để reset mỗi ngày
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserMission', UserMissionSchema);