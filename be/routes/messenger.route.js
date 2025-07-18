const express = require("express");
const router = express.Router();
const messengerController = require("../controllers/messenger.controller");

// Tạo hội thoại
router.post("/conversations", messengerController.createConversation);

// Lấy danh sách hội thoại theo user
router.get("/conversations/:userId", messengerController.getConversationsByUserId);

// Gửi tin nhắn
router.post("/messages", messengerController.sendMessage);

// Lấy tin nhắn của hội thoại
router.get("/messages/:conversationId", messengerController.getMessages);

// Các API placeholder (nếu chưa cần, có thể xoá)
router.put("/messages/:id/status", messengerController.updateMessageStatus);
router.put("/messages/read/:messageId", messengerController.updateMessageStatus);
router.put("/conversations/:id/close", messengerController.closeConversation);
router.post("/block", messengerController.blockUser);
router.get("/unread-count/:userId", messengerController.getUnreadCount);

module.exports = router;