const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authenticate.controller");

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);

// Route cho sản phẩm
router.use("/products", require("./product.route"));

// Route cho danh mục sản phẩm
router.use("/categories", require("./category.route"));
module.exports = router;
