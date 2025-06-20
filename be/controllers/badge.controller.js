const express = require("express");
const router = express.Router();
const badgeService = require("../services/badge.service");

// Tạo huy hiệu mới
router.post("/create", async (req, res) => {
    try {
        const badgeData = req.body;
        const newBadge = await badgeService.createBadge(badgeData);
        return res.status(201).json({
            status: true,
            message: "Huy hiệu đã được tạo thành công!",
            data: newBadge,
        });
    } catch (error) {
        console.error("Lỗi tạo huy hiệu:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Lấy danh sách huy hiệu
router.get("/list", async (req, res) => {
    try {
        const badges = await badgeService.getAllBadges();
        return res.status(200).json({
            status: true,
            message: "Lấy danh sách huy hiệu thành công!",
            data: badges,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách huy hiệu:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Trao huy hiệu cho người dùng
router.post("/award", async (req, res) => {
    try {
        const awardData = req.body;
        const awardedBadge = await badgeService.awardBadge(awardData);
        return res.status(201).json({
            status: true,
            message: "Huy hiệu đã được trao thành công!",
            data: awardedBadge,
        });
    } catch (error) {
        console.error("Lỗi trao huy hiệu:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Lấy danh sách huy hiệu của người dùng
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const userBadges = await badgeService.getUserBadges(userId);
        return res.status(200).json({
            status: true,
            message: "Lấy danh sách huy hiệu của người dùng thành công!",
            data: userBadges,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách huy hiệu của người dùng:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

module.exports = router;
