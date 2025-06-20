const mongoose = require("mongoose");

const ConversationMemberSchema = new mongoose.Schema({
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true }, // Liên kết conversations.id
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai tham gia, liên kết users.id
    joined_at: { type: Date, default: Date.now }, // Thời điểm vào hội thoại
});

module.exports = mongoose.model("ConversationMember", ConversationMemberSchema);
