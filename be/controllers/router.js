var express = require("express");
var router = express.Router();

router.use("/api/auth", require(__dirname + "/api/authenticatecontroller"));


router.get("/", function(req, res) {
    res.render("index.ejs");
});
module.exports = router;