const Conversation = require("../models/messenger/conversations.model");
const ConversationMember = require("../models/messenger/conversation_members.model");
const Message = require("../models/messenger/messages.model");
const Block = require("../models/messenger/block.model");

exports.blockUser = async (req, res) => {
    try {
        const { user_id, blocked_user_id, reason } = req.body;

        if (!user_id || !blocked_user_id) {
            return res.status(400).json({ message: "Thiếu thông tin chặn user" });
        }

        const existing = await Block.findOne({ user_id, blocked_user_id });
        if (existing) {
            return res.status(400).json({ message: "Đã chặn user này rồi" });
        }

        const block = new Block({ user_id, blocked_user_id, reason });
        const saved = await block.save();

        res.status(201).json({ message: "Đã chặn user thành công", data: saved });
    } catch (err) {
        console.error("Lỗi chặn user:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.createConversation = async (req, res) => {
    try {
        const { user_id, receiver_id, item_id } = req.body;

        if (!user_id || !receiver_id || !item_id) {
            return res.status(400).json({ message: "Thiếu thông tin tạo hội thoại" });
        }

        // Kiểm tra đã tồn tại hội thoại chưa
        const existing = await Conversation.findOne({
            item_id,
            _id: { $in: await ConversationMember.find({ user_id: { $in: [user_id, receiver_id] } }).distinct("conversation_id") }
        });

        if (existing) {
            return res.status(200).json({ message: "Hội thoại đã tồn tại", conversation: existing });
        }

        const conversation = new Conversation({ item_id });
        const saved = await conversation.save();

        await ConversationMember.insertMany([
            { conversation_id: saved._id, user_id },
            { conversation_id: saved._id, user_id: receiver_id }
        ]);

        res.status(201).json({ message: "Tạo hội thoại thành công", conversation: saved });
    } catch (err) {
        console.error("Lỗi tạo hội thoại:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { conversation_id, sender_id, content, message_type } = req.body;

        if (!conversation_id || !sender_id || !content) {
            return res.status(400).json({ message: "Thiếu thông tin gửi tin nhắn" });
        }

        const message = new Message({
            conversation_id,
            sender_id,
            content,
            message_type: message_type || "text"
        });

        const saved = await message.save();

        res.status(201).json({ message: "Gửi tin nhắn thành công", data: saved });
    } catch (err) {
        console.error("Lỗi gửi tin nhắn:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversation_id: conversationId })
            .sort({ sent_at: 1 })
            .populate("sender_id", "name email");

        res.json(messages);
    } catch (err) {
        console.error("Lỗi lấy tin nhắn:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
exports.updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["sent", "delivered", "read"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Trạng thái không hợp lệ" });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
        }

        res.json({ message: "Cập nhật trạng thái thành công", data: message });
    } catch (err) {
        console.error("Lỗi cập nhật trạng thái:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
exports.closeConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndUpdate(
            req.params.id,
            { is_closed: true, updated_at: new Date() },
            { new: true }
        );

        if (!conversation) {
            return res.status(404).json({ message: "Không tìm thấy hội thoại" });
        }

        res.json({ message: "Đã đóng hội thoại thành công", conversation });
    } catch (err) {
        console.error("Lỗi đóng hội thoại:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
exports.getUnreadCount = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        // Tìm tất cả hội thoại có tham gia
        const conversations = await ConversationMember.find({ user_id: userId }).distinct("conversation_id");

        // Đếm tin nhắn chưa đọc, không phải do user đó gửi
        const unreadCount = await Message.countDocuments({
            conversation_id: { $in: conversations },
            sender_id: { $ne: userId },
            status: { $ne: "read" }
        });

        res.json({ unreadCount });
    } catch (err) {
        console.error("Lỗi lấy số tin nhắn chưa đọc:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
