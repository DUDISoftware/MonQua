const express = require("express");
const router = express.Router();
const notificationService = require("../services/notification.service");

// Tạo thông báo mới
router.post("/create", async (req, res) => {
    try {
        const notificationData = req.body;
        const newNotification = await notificationService.createNotification(notificationData);
        return res.status(201).json({
            error: 0,
            error_text: "Thông báo đã được tạo thành công!",
            data_name: "Thông báo",
            data: [newNotification],
        });
    } catch (error) {
        console.error("Lỗi tạo thông báo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Thông báo",
            data: [],
        });
    }
});

// Lấy danh sách thông báo
router.get("/list", async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách thông báo thành công!",
            data_name: "Danh sách thông báo",
            data: notifications,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách thông báo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh sách thông báo",
            data: [],
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
                error: 404,
                error_text: "Thông báo không tồn tại!",
                data_name: "Thông báo",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Cập nhật thông báo thành công!",
            data_name: "Thông báo",
            data: [updatedNotification],
        });
    } catch (error) {
        console.error("Lỗi cập nhật thông báo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Thông báo",
            data: [],
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
                error: 404,
                error_text: "Thông báo không tồn tại!",
                data_name: "Thông báo",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Xóa thông báo thành công!",
            data_name: "Thông báo",
            data: [],
        });
    } catch (error) {
        console.error("Lỗi xóa thông báo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Thông báo",
            data: [],
        });
    }
});

module.exports = router;
