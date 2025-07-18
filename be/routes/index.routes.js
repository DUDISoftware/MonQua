const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const postRouter = require("../routes/post.route");
const productRouter = require("../routes/product.route");
const communityRouter = require("../controllers/community.controller");
const messengerRouter = require("./messenger.route");

router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);

router.use("/messenger", messengerRouter);

// Route cho chats
router.use("/chat", chatRouter); // ✅ Truyền router vào

// Route cho sản phẩm
router.use("/Product", productRouter);

// Post routes
router.use("/posts", postRouter);

module.exports = router;

router.use("/community", communityRouter);
router.use("/products", require("./product.route"));
router.use("/categories", require("./category.route"));
router.use("/messenger", messengerRouter);

module.exports = router;

