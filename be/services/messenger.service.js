const Conversation = require("../models/messenger/conversations.model");
const ConversationMember = require("../models/messenger/conversation_members.model");
const Message = require("../models/messenger/messages.model");

// Tạo hội thoại mới (1-1)
exports.createConversation = async (userIds) => {
    try {
        // Kiểm tra nếu đã có hội thoại giữa 2 user thì trả về luôn
        const existing = await ConversationMember.aggregate([
            { $match: { user_id: { $in: userIds.map(id => require("mongoose").Types.ObjectId(id)) } } },
            { $group: { _id: "$conversation_id", members: { $addToSet: "$user_id" } } },
            { $match: { members: { $size: 2 } } }
        ]);
        if (existing.length > 0) {
            const conversation = await Conversation.findById(existing[0]._id);
            return conversation;
        }
        // Tạo hội thoại mới
        const conversation = new Conversation();
        await conversation.save();
        for (const userId of userIds) {
            await ConversationMember.create({
                conversation_id: conversation._id,
                user_id: userId,
                joined_at: new Date()
            });
        }
        return conversation;
    } catch (error) {
        console.error("Lỗi khi tạo hội thoại:", error.message);
        throw new Error("Lỗi khi tạo hội thoại: " + error.message);
    }
};

// Lấy danh sách hội thoại của user
exports.getUserConversations = async (userId) => {
    try {
        const memberConvs = await ConversationMember.find({ user_id: userId }).populate("conversation_id");
        return memberConvs.map(m => m.conversation_id);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách hội thoại:", error.message);
        throw new Error("Lỗi khi lấy danh sách hội thoại: " + error.message);
    }
};

// Gửi tin nhắn mới
exports.sendMessage = async (messageData) => {
    try {
        const message = new Message(messageData);
        await message.save();
        // Cập nhật updated_at của hội thoại
        await Conversation.findByIdAndUpdate(message.conversation_id, { updated_at: new Date() });
        return message;
    } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error.message);
        throw new Error("Lỗi khi gửi tin nhắn: " + error.message);
    }
};

// Lấy tin nhắn của hội thoại
exports.getMessagesByConversation = async (conversationId) => {
    try {
        return await Message.find({ conversation_id: conversationId }).sort({ sent_at: 1 });
    } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error.message);
        throw new Error("Lỗi khi lấy tin nhắn: " + error.message);
    }
};

// Đánh dấu đã đọc tin nhắn
exports.markMessageAsRead = async (messageId) => {
    try {
        return await Message.findByIdAndUpdate(messageId, { status: "read" }, { new: true });
    } catch (error) {
        console.error("Lỗi khi đánh dấu đã đọc:", error.message);
        throw new Error("Lỗi khi đánh dấu đã đọc: " + error.message);
    }
};
