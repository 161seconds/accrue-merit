require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import 4 Models
const User = require('./models/User');
const KarmaLog = require('./models/KarmaLog');
const Donation = require('./models/Donation');
const UserMission = require('./models/UserMission');

const app = express();
app.use(express.json());
app.use(cors());

// ══════════════ KẾT NỐI MONGODB ══════════════
const dbURI = 'mongodb://127.0.0.1:27017/tichduc_db';
mongoose.connect(dbURI)
    .then(() => console.log('✦ Chân Nguyên Đã Tụ: Kết nối MongoDB thành công!'))
    .catch((err) => console.error('❌ Lỗi kết nối Database:', err));

// ══════════════ API KHỞI TẠO (CŨ) ══════════════
app.get('/init-db', async (req, res) => {
    try {
        let user = await User.findOne({ username: '161seconds' });
        if (!user) {
            user = new User({
                username: '161seconds',
                password: '123',
                name: 'Bảo Demo',
                stats: { ducTotal: 3667, toiTotal: 25, moCount: 150, streak: 7 }
            });
            await user.save();
        }
        res.send('Đã khởi tạo Database hoàn chỉnh! Hãy mở MongoDB Compass để kiểm tra.');
    } catch (error) {
        res.status(500).send('Lỗi: ' + error.message);
    }
});

// ══════════════ API ĐĂNG KÝ ══════════════
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, name } = req.body;

        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại!' });

        const newUser = new User({ username, password, name });
        await newUser.save();
        res.json({ message: 'Đăng ký thành công!', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server: ' + err.message });
    }
});

// ══════════════ API ĐĂNG NHẬP ══════════════
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });
        if (!user) return res.status(400).json({ error: 'Sai tài khoản hoặc mật khẩu!' });

        res.json({ message: 'Đăng nhập thành công!', user });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server: ' + err.message });
    }
});

// ══════════════ API ĐỒNG BỘ ĐIỂM SỐ ══════════════
app.post('/api/sync', async (req, res) => {
    try {
        const { username, stats } = req.body;

        const user = await User.findOneAndUpdate(
            { username },
            { $set: { stats: stats } },
            { returnDocument: 'after' }
        );

        if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
        res.json({ message: 'Đã lưu điểm lên mây!', user });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server: ' + err.message });
    }
});

// ══════════════ KHỞI ĐỘNG SERVER ══════════════
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✦ Máy chủ đang chạy tại: http://localhost:${PORT}`);
});