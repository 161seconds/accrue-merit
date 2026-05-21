import { Request, Response } from 'express';
import Mission from '../models/missionsModel';
import User from '../models/user.schema';

export const getMissions = async (req: Request, res: Response) => {
    try {
        const missions = await Mission.find({});
        res.status(200).json(missions);
    } catch (error) {
        console.error("Lỗi khi lấy nhiệm vụ:", error);
        res.status(500).json({ message: "Lỗi server, không thể lấy dữ liệu nhiệm vụ" });
    }
};

export const completeMission = async (req: Request, res: Response) => {
    try {
        const { missionId } = req.body;
        const { user_id } = (req as any).decoded_authorization;

        if (!missionId) {
            return res.status(400).json({ message: 'missionId là bắt buộc' });
        }

        let mission = await Mission.findById(missionId);
        if (!mission) {
            // Thử tìm theo field id thay vì _id
            mission = await Mission.findOne({ id: missionId });
            if (!mission) {
                return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
            }
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Cộng điểm cho user
        user.stats.ducTotal += (mission as any).pts || 0;
        await user.save();

        res.status(200).json({ message: 'Đã ghi nhận hoàn thành nhiệm vụ và cộng điểm', missionId, ptsAdded: (mission as any).pts });
    } catch (error) {
        console.error("Lỗi khi hoàn thành nhiệm vụ:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};