const Product = require('../../models/product/product.model');
const Category = require('../../models/product/productCategory.model');
const User = require('../../models/auth/user.model');
const toSlug = require('../../utils/slug.util');
const { updateImageOnCloudinary, deleteImageFromCloudinary } = require('../../middleware/cloudinary.middleware');

module.exports = {
    // 1. Tạo sản phẩm mới
    async createProduct(productData, files) {
        try {
            // Kiểm tra user, category
            const userExists = await User.findById(productData.user_id);
            if (!userExists) throw new Error("user_id không tồn tại");
            if (productData.category_id) {
                const categoryExists = await Category.findById(productData.category_id);
                if (!categoryExists) throw new Error("category_id không tồn tại");
            }

            // Tạo slug và kiểm tra trùng
            const slug = toSlug(productData.title || productData.product_name);
            const slugExists = await Product.findOne({ slug });
            if (slugExists) throw new Error("Slug sản phẩm đã tồn tại, vui lòng chọn tên khác!");
            productData.slug = slug;

            // Upload ảnh chính
            const imageMain = files?.image_url?.[0];
            if (!imageMain || !imageMain.path) throw new Error("Ảnh chính không hợp lệ");
            const uploadMain = await updateImageOnCloudinary(null, imageMain.path, 'products');
            productData.image_url = uploadMain.secure_url;

            // Upload ảnh phụ
            const imageSubs = files?.sub_images_urls || [];
            const subImages = [];
            for (const img of imageSubs) {
                if (img && img.path) {
                    const uploadSub = await updateImageOnCloudinary(null, img.path, 'products');
                    subImages.push(uploadSub.secure_url);
                }
            }
            productData.sub_images_urls = subImages;

            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            if (error.name === "ValidationError") {
                const msg = Object.values(error.errors).map(e => e.message).join(', ');
                throw new Error(msg);
            }
            throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
        }
    },

    // 2. Lấy tất cả sản phẩm
    async getAllProducts(filters = {}) {
        try {
            return await Product.find(filters);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
            throw new Error("Lỗi khi lấy danh sách sản phẩm.");
        }
    },

    // 3. Lấy chi tiết sản phẩm
    async getProductById(id) {
        try {
            const product = await Product.findById(id).lean();
            if (!product) return null;
            return product;
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
            throw new Error("Lỗi khi lấy chi tiết sản phẩm.");
        }
    },

    // 4. Cập nhật/Chỉnh sửa sản phẩm
    async updateProduct(id, updateData, files) {
        try {
            const product = await Product.findById(id);
            if (!product) throw new Error("Không tìm thấy sản phẩm");

            // Nếu cập nhật slug
            if (updateData.title || updateData.product_name) {
                const newSlug = toSlug(updateData.title || updateData.product_name);
                const slugExists = await Product.findOne({ slug: newSlug, _id: { $ne: id } });
                if (slugExists) throw new Error("Slug sản phẩm đã tồn tại, vui lòng chọn tên khác!");
                updateData.slug = newSlug;
            }

            // Xử lý ảnh chính
            const imageMain = files?.image_url?.[0];
            if (imageMain && imageMain.path) {
                let oldPublicId = null;
                if (product.image_url) {
                    const matches = product.image_url.match(/\/upload\/[^/]+\/(products\/[^.]+)\.[a-zA-Z0-9]+$/);
                    oldPublicId = matches ? matches[1] : null;
                }
                const uploadMain = await updateImageOnCloudinary(oldPublicId, imageMain.path, 'products');
                updateData.image_url = uploadMain.secure_url;
            }
            // Nếu image_url rỗng/null thì xóa ảnh trên Cloudinary
            if (updateData.image_url === '' || updateData.image_url === null) {
                let oldPublicId = null;
                if (product.image_url) {
                    const matches = product.image_url.match(/\/upload\/[^/]+\/(products\/[^.]+)\.[a-zA-Z0-9]+$/);
                    oldPublicId = matches ? matches[1] : null;
                }
                if (oldPublicId) await deleteImageFromCloudinary(oldPublicId);
                updateData.image_url = null;
            }

            // Xử lý ảnh phụ
            const imageSubs = files?.sub_images_urls || [];
            if (imageSubs.length > 0) {
                const subImages = [];
                for (const img of imageSubs) {
                    if (img && img.path) {
                        const uploadSub = await updateImageOnCloudinary(null, img.path, 'products');
                        subImages.push(uploadSub.secure_url);
                    }
                }
                updateData.sub_images_urls = subImages;
            }

            return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } catch (error) {
            throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
        }
    },

    // 5. Xóa sản phẩm
    async deleteProduct(id) {
        try {
            const product = await Product.findById(id);
            if (!product) throw new Error("Không tìm thấy sản phẩm");
            let oldPublicId = null;
            if (product.image_url) {
                const matches = product.image_url.match(/\/upload\/[^/]+\/(products\/[^.]+)\.[a-zA-Z0-9]+$/);
                oldPublicId = matches ? matches[1] : null;
            }
            if (oldPublicId) await deleteImageFromCloudinary(oldPublicId);
            if (Array.isArray(product.sub_images_urls)) {
                for (const url of product.sub_images_urls) {
                    let subPublicId = null;
                    if (url) {
                        const matches = url.match(/\/upload\/[^/]+\/(products\/[^.]+)\.[a-zA-Z0-9]+$/);
                        subPublicId = matches ? matches[1] : null;
                    }
                    if (subPublicId) await deleteImageFromCloudinary(subPublicId);
                }
            }
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
        }
    },

    // 6. Lọc sản phẩm theo danh mục
    async getProductsByCategory(categoryId) {
        try {
            if (!categoryId) throw new Error("Thiếu categoryId");
            const products = await Product.find({ category_id: categoryId })
                .populate('category_id', 'name')
                .lean();
            return products;
        } catch (error) {
            throw new Error("Lỗi khi lọc sản phẩm theo danh mục: " + error.message);
        }
    },

};
