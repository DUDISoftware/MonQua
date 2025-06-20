const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const communityRouter = require("../controllers/community.controller");
const messengerRouter = require("../controllers/messenger.controller");

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);


// Mount toàn bộ router của controller vào /contact
router.use("/contact", contactRouter);

// Mount toàn bộ router của controller vào /notification
router.use("/notification", notificationRouter);

// Mount toàn bộ router của controller vào /badge
router.use("/badge", badgeRouter);

// Mount toàn bộ router của controller vào /community
router.use("/community", communityRouter);

// Mount toàn bộ router của controller vào /messenger
router.use("/messenger", messengerRouter);


// Route cho sản phẩm
router.use("/products", require("./product.route"));

// Route cho danh mục sản phẩm
router.use("/categories", require("./category.route"));

module.exports = router;
