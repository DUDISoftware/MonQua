var express = require("express");
var router = express.Router();

router.use("/api/auth", require(__dirname + "/api/authenticate"));

module.exports = router;