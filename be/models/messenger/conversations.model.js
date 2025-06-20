const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now }, // Thời điểm tạo hội thoại
    updated_at: { type: Date, default: Date.now }, // Lần cập nhật cuối (tin nhắn mới nhất)
});

module.exports = mongoose.model("Conversation", ConversationSchema);
