const express = require("express");
const router = express.Router();
const messengerService = require("../services/messenger.service");

// Tạo hội thoại mới (1-1)
router.post("/conversations/create", async (req, res) => {
    try {
        const { userIds } = req.body; // [userId1, userId2]
        const conversation = await messengerService.createConversation(userIds);
        return res.status(201).json({
            status: true,
            message: "Tạo hội thoại thành công!",
            data: conversation,
        });
    } catch (error) {
        console.error("Lỗi tạo hội thoại:", error.message);
        return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
});

// Lấy danh sách hội thoại của user
router.get("/conversations/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await messengerService.getUserConversations(userId);
        return res.status(200).json({
            status: true,
            message: "Lấy danh sách hội thoại thành công!",
            data: conversations,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách hội thoại:", error.message);
        return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
});

// Gửi tin nhắn mới
router.post("/messages/send", async (req, res) => {
    try {
        const messageData = req.body;
        const message = await messengerService.sendMessage(messageData);
        return res.status(201).json({
            status: true,
            message: "Gửi tin nhắn thành công!",
            data: message,
        });
    } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error.message);
        return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
});

// Lấy tin nhắn của hội thoại
router.get("/messages/conversation/:conversationId", async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        const messages = await messengerService.getMessagesByConversation(conversationId);
        return res.status(200).json({
            status: true,
            message: "Lấy tin nhắn thành công!",
            data: messages,
        });
    } catch (error) {
        console.error("Lỗi lấy tin nhắn:", error.message);
        return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
});

// Đánh dấu đã đọc tin nhắn
router.put("/messages/read/:messageId", async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const updated = await messengerService.markMessageAsRead(messageId);
        return res.status(200).json({
            status: true,
            message: "Đã đánh dấu đã đọc!",
            data: updated,
        });
    } catch (error) {
        console.error("Lỗi đánh dấu đã đọc:", error.message);
        return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
});

module.exports = router;
