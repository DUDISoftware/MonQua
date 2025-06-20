const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Ai nhận thông báo (null nếu broadcast)
    type: { type: String, required: true }, // Loại thông báo: system/admin/event/promotion/...
    title: { type: String, required: true }, // Tiêu đề thông báo
    content: { type: String, required: true }, // Nội dung thông báo
    sent_at: { type: Date, default: Date.now }, // Thời gian gửi thông báo
    is_read: { type: Boolean, default: false }, // Trạng thái đã đọc/chưa đọc
    channel: { type: String, required: true }, // Kênh gửi: push/email/sms
    action_link: { type: String, default: null }, // Link hành động (deep link hoặc URL)
});

module.exports = mongoose.model("Notification", NotificationSchema);
