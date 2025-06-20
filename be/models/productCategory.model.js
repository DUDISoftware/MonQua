const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // đổi tên ref nếu cần populate
    default: null
  }
});

// Model tên chuẩn: "Category"
module.exports = mongoose.model("Category", categorySchema);
