const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "product_categories" },
  image_url: String,
  location: String,
  is_heavy: Boolean,
  contact_phone: String,
  contact_zalo: String,
  status: { type: String, enum: ["pending", "active", "given", "hidden"], default: "pending" },
  view_count: { type: Number, default: 0 },
  interested_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
