const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
<<<<<<< HEAD
const messengerRouter = require("../controllers/messenger.controller");
const postRouter = require("../routes/post.route");
const productRouter = require("../routes/product.route");
=======
const communityRouter = require("../controllers/community.controller");
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83

const messengerRouter = require("./messenger.route");

router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);
router.use("/badge", badgeRouter);
<<<<<<< HEAD
router.use("/messenger", messengerRouter);

// Route cho chats
router.use("/chat", chatRouter); // ✅ Truyền router vào

// Route cho sản phẩm
router.use("/Product", productRouter);

// Post routes
router.use("/posts", postRouter);

module.exports = router;
=======
router.use("/community", communityRouter);
router.use("/products", require("./product.route"));
router.use("/categories", require("./category.route"));
router.use("/messenger", messengerRouter);

module.exports = router;
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83
