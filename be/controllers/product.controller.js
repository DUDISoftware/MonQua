const Product = require("../models/product.model");
const User = require("../models/auth/user.model");

exports.createProduct = async (req, res) => {
  try {
    // Kiểm tra nếu không có body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Dữ liệu sản phẩm không hợp lệ!" });
    }

    const {
      user_id,
      title,
      description,
      category_id,
      location,
      contact_phone,
      contact_zalo,
      is_heavy
    } = req.body;

    // Kiểm tra user tồn tại
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Lấy URL ảnh từ Cloudinary
    const image_url = req.file?.path || null;

    const newProduct = new Product({
      user_id,
      title,
      description,
      category_id,
      location,
      contact_phone,
      contact_zalo,
      is_heavy,
      image_url,
      status: "pending",
      created_at: new Date(),
      updated_at: new Date()
    });

    const saved = await newProduct.save();

    res.status(201).json({
      message: "Đăng tin thành công, chờ duyệt",
      product: saved
    });
  } catch (err) {
    console.error("Lỗi khi tạo sản phẩm:", err.message);
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error: err.message });
  }
};
