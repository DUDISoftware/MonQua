const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Slug cho sản phẩm
  description: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
  image_url: String,
  sub_images_urls: [String], // Mảng các URL ảnh phụ

  //---------------------API provinces.open-api.vn---------------------
  location: String, // Địa chỉ đầy đủ (chuỗi kết hợp)

  // Thông tin địa chỉ chi tiết từ API tỉnh thành
  location_details: {
    province_code: { type: String }, // Mã tỉnh/thành phố
    province_name: { type: String }, // Tên tỉnh/thành phố
    district_code: { type: String }, // Mã quận/huyện
    district_name: { type: String }, // Tên quận/huyện
    ward_code: { type: String }, // Mã xã/phường
    ward_name: { type: String }, // Tên xã/phường
    specific_address: { type: String }, // Địa chỉ cụ thể (số nhà, tên đường)
    full_address: { type: String } // Địa chỉ đầy đủ đã format
  },
  //--------------------------------------------------------------------
  label: { type: String, default: "Mới" }, // Nhãn hiển thị (Mới, Hot)
  is_heavy: Boolean,
  contact_phone: String,
  contact_zalo: String,
  quality: { type: String, enum: ["new", "used", "like_new_90", "like_new_70"], default: "new" },
  status: { type: String, enum: ["pending", "active", "given", "hidden"], default: "pending" },
  delivery_method: { type: String, enum: ["giao_tan_tay", "nguoi_nhan_den_lay", "gap_tai_tay"], default: "giao_tan_tay" },
  view_count: { type: Number, default: 0 },
  interested_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);