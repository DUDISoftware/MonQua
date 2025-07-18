const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Slug cho danh mục
    description: String,
    // Các trường bổ sung nếu cần
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
