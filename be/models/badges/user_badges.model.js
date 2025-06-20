const mongoose = require("mongoose");

const UserBadgeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người nhận badge
    badge_id: { type: mongoose.Schema.Types.ObjectId, ref: "Badge", required: true }, // Badge nào
    awarded_at: { type: Date, default: Date.now }, // Thời điểm được trao badge
});

module.exports = mongoose.model("UserBadge", UserBadgeSchema);
