const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const messengerRouter = require("../controllers/messenger.controller");
const postRouter = require("../routes/post.route");
const productRouter = require("../routes/product.route");

const chatRouter = require("./chat.route"); // ✅ Import đúng file routes/chat.route.js

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);
router.use("/badge", badgeRouter);
router.use("/messenger", messengerRouter);

// Route cho chats
router.use("/chat", chatRouter); // ✅ Truyền router vào

// Route cho sản phẩm
router.use("/Product", productRouter);

// Post routes
router.use("/posts", postRouter);

module.exports = router;