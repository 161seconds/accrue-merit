import { Request, Response } from 'express';
import Mission from '../models/missionsModel';

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
        if (!missionId) {
            return res.status(400).json({ message: 'missionId là bắt buộc' });
        }

        const mission = await Mission.findById(missionId);
        if (!mission) {
            // Thử tìm theo field id thay vì _id
            const missionById = await Mission.findOne({ id: missionId });
            if (!missionById) {
                return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
            }
        }

        // Ghi nhận hoàn thành (có thể mở rộng lưu vào user profile sau)
        res.status(200).json({ message: 'Đã ghi nhận hoàn thành nhiệm vụ', missionId });
    } catch (error) {
        console.error("Lỗi khi hoàn thành nhiệm vụ:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};