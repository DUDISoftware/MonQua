const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên huy hiệu
    description: { type: String, default: null }, // Ý nghĩa/ngắn gọn về badge
    icon_url: { type: String, default: null }, // Ảnh đại diện badge
});

module.exports = mongoose.model("Badge", BadgeSchema);
