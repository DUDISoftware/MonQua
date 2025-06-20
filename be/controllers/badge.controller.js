const express = require("express");
const router = express.Router();
const badgeService = require("../services/badge.service");

// Tạo huy hiệu mới
router.post("/create", async (req, res) => {
    try {
        const badgeData = req.body;
        const newBadge = await badgeService.createBadge(badgeData);
        return res.status(201).json({
            error: 0,
            error_text: "Huy hiệu đã được tạo thành công!",
            data_name: "Huy hiệu",
            data: [newBadge],
        });
    } catch (error) {
        console.error("Lỗi tạo huy hiệu:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Huy hiệu",
            data: [],
        });
    }
});

// Lấy danh sách huy hiệu
router.get("/list", async (req, res) => {
    try {
        const badges = await badgeService.getAllBadges();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách huy hiệu thành công!",
            data_name: "Danh sách huy hiệu",
            data: badges,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách huy hiệu:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh sách huy hiệu",
            data: [],
        });
    }
});

// Trao huy hiệu cho người dùng
router.post("/award", async (req, res) => {
    try {
        const awardData = req.body;
        const awardedBadge = await badgeService.awardBadge(awardData);
        return res.status(201).json({
            error: 0,
            error_text: "Huy hiệu đã được trao thành công!",
            data_name: "Trao huy hiệu",
            data: [awardedBadge],
        });
    } catch (error) {
        console.error("Lỗi trao huy hiệu:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Trao huy hiệu",
            data: [],
        });
    }
});

// Lấy danh sách huy hiệu của người dùng
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const userBadges = await badgeService.getUserBadges(userId);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách huy hiệu của người dùng thành công!",
            data_name: "Huy hiệu của người dùng",
            data: userBadges,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách huy hiệu của người dùng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Huy hiệu của người dùng",
            data: [],
        });
    }
});

module.exports = router;
