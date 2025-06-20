const Category = require("../models/productCategory.model");

// ➕ Thêm danh mục
exports.createCategory = async (req, res) => {
  try {
    const { name, description, parent_id } = req.body;

    const category = new Category({
      name,
      description,
      parent_id: parent_id || null,
    });

    const saved = await category.save();
    res.status(201).json({
      message: "Tạo danh mục thành công",
      data: saved
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo danh mục", error: err.message });
  }
};

// 📋 Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent_id", "name");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách", error: err.message });
  }
};

// 🔍 Lấy chi tiết danh mục
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parent_id", "name");
    if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết", error: err.message });
  }
};

// ✏️ Cập nhật danh mục
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json({
      message: "Cập nhật thành công",
      data: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật", error: err.message });
  }
};

// ❌ Xoá danh mục
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json({ message: "Đã xoá danh mục thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá", error: err.message });
  }
};
