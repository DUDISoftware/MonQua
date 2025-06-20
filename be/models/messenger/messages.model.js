const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true }, // Thuộc hội thoại nào
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai gửi, liên kết users.id
    content: { type: String, required: true }, // Nội dung tin nhắn (text, emoji, link,...)
    type: { type: String, default: "text" }, // Loại: text/image/link/emoji
    sent_at: { type: Date, default: Date.now }, // Thời điểm gửi
    status: { type: String, default: "sent" }, // Trạng thái: sent/delivered/read
    deleted: { type: Boolean, default: false }, // Đã bị thu hồi/xóa chưa
    edited_at: { type: Date, default: null }, // Thời điểm sửa (nếu có)
    reply_to: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null }, // Trả lời tin nhắn nào (nullable, reply)
});

module.exports = mongoose.model("Message", MessageSchema);
