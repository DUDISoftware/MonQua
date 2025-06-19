const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authenticate.controller");

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);

module.exports = router;
