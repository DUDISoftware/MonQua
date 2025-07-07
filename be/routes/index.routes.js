const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const communityRouter = require("../controllers/community.controller");
const messengerRouter = require("../controllers/messenger.controller");

const chatRouter = require("./chat.route"); // ✅ Import đúng file routes/chat.route.js

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);
router.use("/badge", badgeRouter);
router.use("/community", communityRouter);
router.use("/messenger", messengerRouter);

// Route cho sản phẩm
router.use("/products", require("./product.route"));
router.use("/categories", require("./category.route"));
router.use("/chat", chatRouter); // ✅ Truyền router vào


module.exports = router;