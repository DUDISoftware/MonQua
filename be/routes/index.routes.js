const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const postRouter = require("./post.route");
const productRouter = require("./product.route");
const messengerRouter = require("./messenger.route");
// const chatRouter = require("./chat.route");  // Uncomment if chat.route.js exists

router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);
router.use("/badge", badgeRouter);
router.use("/messenger", messengerRouter);
// router.use("/chat", chatRouter);  // Uncomment if chat.route.js exists
router.use("/products", productRouter);
router.use("/posts", postRouter);
// router.use("/community", communityRouter);  // Uncomment if communityRouter exists

module.exports = router;

