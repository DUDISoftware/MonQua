const messengerService = require("../services/messenger.service");

exports.createConversation = async (req, res) => {
  try {
    const { user_id, receiver_id, item_id } = req.body;

    if (!user_id || !receiver_id || !item_id) {
      return res.status(400).json({
        error: 1,
        error_text: "Thiếu thông tin user_id, receiver_id hoặc item_id"
      });
    }

    const conversation = await messengerService.createConversation(user_id, receiver_id, item_id);

    return res.status(200).json({
      error: 0,
      error_text: "Tạo hội thoại thành công!",
      data_name: "Hội thoại",
      data: [conversation],
    });
  } catch (error) {
    console.error("Lỗi tạo hội thoại:", error.message);
    return res.status(500).json({ error: 1, error_text: "Lỗi server!", data: [] });
  }
};


exports.getConversationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await messengerService.getUserConversations(userId);
    return res.status(200).json({ error: 0, data: conversations });
  } catch (err) {
    console.error("Lỗi lấy hội thoại:", err);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = await messengerService.sendMessage(req.body);
    return res.status(201).json({ error: 0, data: [message] });
  } catch (err) {
    console.error("Lỗi gửi tin nhắn:", err.message);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await messengerService.getMessagesByConversation(conversationId);
    return res.status(200).json({ error: 0, data: messages });
  } catch (err) {
    console.error("Lỗi lấy tin nhắn:", err);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};
exports.getUnreadCount = async (req, res) => {
  return res.status(200).json({ message: "Chưa implement getUnreadCount" });
};
exports.blockUser = async (req, res) => {
  try {
    const { userId, blockedUserId } = req.body;
    // Ghi vào bảng blocked_users
    await messengerService.blockUser(userId, blockedUserId);
    return res.status(200).json({ error: 0, message: "Đã chặn người dùng" });
  } catch (err) {
    console.error("Lỗi block user:", err.message);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await messengerService.updateMessageStatus(id, status);
    return res.status(200).json({ error: 0, data: updated });
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái:", err.message);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};
exports.closeConversation = async (req, res) => {
  try {
    const { id } = req.params;
    await messengerService.closeConversation(id);
    return res.status(200).json({ error: 0, message: "Đã đóng hội thoại" });
  } catch (err) {
    console.error("Lỗi đóng hội thoại:", err.message);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await messengerService.getUnreadCount(userId);
    return res.status(200).json({ error: 0, data: { unreadCount: count } });
  } catch (err) {
    console.error("Lỗi đếm tin chưa đọc:", err.message);
    return res.status(500).json({ error: 1, message: "Lỗi server" });
  }
};
