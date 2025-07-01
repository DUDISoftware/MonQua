const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

// Tạo hội thoại
router.post("/conversations", chatController.createConversation);

// Gửi tin nhắn
router.post("/messages", chatController.sendMessage);

// Lấy lịch sử tin nhắn
router.get("/messages/:conversationId", chatController.getMessages);
router.put("/messages/:id/status", chatController.updateMessageStatus);
router.post("/block", chatController.blockUser);
router.put("/conversations/:id/close", chatController.closeConversation);
router.get("/unread-count/:userId", chatController.getUnreadCount);

module.exports = router;
