const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const notificationRouter = require("../controllers/notification.controller");
const badgeRouter = require("../controllers/badge.controller");
const postRouter = require("../routes/post.route");
const productRouter = require("../routes/product.route");
const messengerRouter = require("./messenger.route");

router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/notification", notificationRouter);
router.use("/badge", badgeRouter);
router.use("/messenger", messengerRouter);
router.use("/products", productRouter);
router.use("/product", productRouter); // Adding this route to support /api/product endpoints
router.use("/posts", postRouter);


module.exports = router;

