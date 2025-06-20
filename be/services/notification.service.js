const Notification = require("../models/notification/notification.model");

// Tạo thông báo mới
exports.createNotification = async (notificationData) => {
    try {
        const notification = new Notification(notificationData);
        return await notification.save();
    } catch (error) {
        console.error("Lỗi khi tạo thông báo:", error.message);
        throw new Error("Lỗi khi tạo thông báo: " + error.message);
    }
};

// Lấy danh sách thông báo
exports.getAllNotifications = async () => {
    try {
        return await Notification.find();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách thông báo:", error.message);
        throw new Error("Lỗi khi lấy danh sách thông báo: " + error.message);
    }
};

// Cập nhật trạng thái thông báo
exports.updateNotification = async (id, updateData) => {
    try {
        return await Notification.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật thông báo:", error.message);
        throw new Error("Lỗi khi cập nhật thông báo: " + error.message);
    }
};

// Xóa thông báo
exports.deleteNotification = async (id) => {
    try {
        return await Notification.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa thông báo:", error.message);
        throw new Error("Lỗi khi xóa thông báo: " + error.message);
    }
};
