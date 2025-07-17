
const ProductCategoryModel = require('../../models/product/productCategory.model');
const toSlug = require('../../utils/slug.util');

module.exports = {
    async createCategory(categoryData) {
        try {
            const { category_name, slug, description } = categoryData;
            if (!category_name) throw new Error("Thiếu tên danh mục");
            // Tự động sinh slug nếu chưa có
            let finalSlug = slug;
            if (!finalSlug) {
                finalSlug = toSlug(category_name);
            }
            // Kiểm tra trùng slug
            const slugExists = await ProductCategoryModel.findOne({ slug: finalSlug });
            if (slugExists) throw new Error("Slug danh mục đã tồn tại, vui lòng chọn tên khác!");
            const category = await ProductCategoryModel.create({ category_name, slug: finalSlug, description });
            return category;
        } catch (error) {
            console.error("Lỗi khi tạo danh mục:", error.message);
            throw new Error("Lỗi khi tạo danh mục.");
        }
    },

    async getAllCategories() {
        try {
            return await ProductCategoryModel.find();
        } catch (error) {
            console.error("Lỗi khi lấy danh sách danh mục:", error.message);
            throw new Error("Lỗi khi lấy danh sách danh mục.");
        }
    },

    async getCategoryById(id) {
        try {
            return await ProductCategoryModel.findById(id);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error.message);
            throw new Error("Lỗi khi lấy danh mục.");
        }
    },

    async updateCategory(id, updateData) {
        try {
            // Nếu có category_name và không có slug, tự động sinh slug
            if (updateData.category_name && !updateData.slug) {
                updateData.slug = toSlug(updateData.category_name);
            }
            // Kiểm tra trùng slug nếu có slug mới
            if (updateData.slug) {
                const slugExists = await ProductCategoryModel.findOne({ slug: updateData.slug, _id: { $ne: id } });
                if (slugExists) throw new Error("Slug danh mục đã tồn tại, vui lòng chọn tên khác!");
            }
            const updated = await ProductCategoryModel.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            return updated;
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error.message);
            throw new Error("Lỗi khi cập nhật danh mục.");
        }
    },

    async deleteCategory(id) {
        try {
            return await ProductCategoryModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error.message);
            throw new Error("Lỗi khi xóa danh mục.");
        }
    },
};
