const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    message_type: { type: String, default: "text" }, // text/image/link/emoji
    sent_at: { type: Date, default: Date.now },
    status: { type: String, default: "sent" }, // sent/delivered/read
    deleted: { type: Boolean, default: false },
    edited_at: { type: Date, default: null },
    reply_to: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null }
});

module.exports = mongoose.model("Message", MessageSchema);
