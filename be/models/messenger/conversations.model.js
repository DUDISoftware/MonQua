const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Sản phẩm liên quan
    is_closed: { type: Boolean, default: false }, // Đánh dấu hội thoại đã đóng khi hết giao dịch
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
