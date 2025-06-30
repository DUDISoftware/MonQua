const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blocked_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, default: "" },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Block", BlockSchema);
