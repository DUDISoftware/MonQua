const express = require("express");
const router = express.Router();
const notificationService = require("../services/notification.service");

// Tạo thông báo mới
router.post("/create", async (req, res) => {
    try {
        const notificationData = req.body;
        const newNotification = await notificationService.createNotification(notificationData);
        return res.status(201).json({
            status: true,
            message: "Thông báo đã được tạo thành công!",
            data: newNotification,
        });
    } catch (error) {
        console.error("Lỗi tạo thông báo:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Lấy danh sách thông báo
router.get("/list", async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        return res.status(200).json({
            status: true,
            message: "Lấy danh sách thông báo thành công!",
            data: notifications,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách thông báo:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Cập nhật trạng thái thông báo
router.put("/update/:id", async (req, res) => {
    try {
        const notificationId = req.params.id;
        const updateData = req.body;
        const updatedNotification = await notificationService.updateNotification(notificationId, updateData);
        if (!updatedNotification) {
            return res.status(404).json({
                status: false,
                message: "Thông báo không tồn tại!",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Cập nhật thông báo thành công!",
            data: updatedNotification,
        });
    } catch (error) {
        console.error("Lỗi cập nhật thông báo:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Xóa thông báo
router.delete("/delete/:id", async (req, res) => {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await notificationService.deleteNotification(notificationId);
        if (!deletedNotification) {
            return res.status(404).json({
                status: false,
                message: "Thông báo không tồn tại!",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Xóa thông báo thành công!",
        });
    } catch (error) {
        console.error("Lỗi xóa thông báo:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

module.exports = router;
