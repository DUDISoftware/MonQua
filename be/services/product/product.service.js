const Product = require('../../models/product/product.model');
const ProductCategory = require('../../models/product/productCategory.model');
const User = require('../../models/auth/user.model');
const toSlug = require('../../utils/slug.util');
const { updateImageOnCloudinary, deleteImageFromCloudinary } = require('../../middleware/cloudinary.middleware');
const axios = require('axios');

module.exports = {
    // Hàm xử lý location details từ API provinces
    async processLocationDetails(locationData) {
        try {
            if (!locationData) return null;

            const { selectedProvince, selectedDistrict, selectedWard, address } = locationData;

            let locationDetails = {
                province_code: selectedProvince || null,
                district_code: selectedDistrict || null,
                ward_code: selectedWard || null,
                specific_address: address || null,
                province_name: null,
                district_name: null,
                ward_name: null,
                full_address: null
            };

            // Lấy tên tỉnh/thành
            if (selectedProvince) {
                const provinceResponse = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}`);
                locationDetails.province_name = provinceResponse.data.name;
            }

            // Lấy tên quận/huyện
            if (selectedDistrict) {
                const districtResponse = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}`);
                locationDetails.district_name = districtResponse.data.name;
            }

            // Lấy tên xã/phường
            if (selectedWard) {
                const wardResponse = await axios.get(`https://provinces.open-api.vn/api/w/${selectedWard}`);
                locationDetails.ward_name = wardResponse.data.name;
            }

            // Tạo địa chỉ đầy đủ
            const addressParts = [
                locationDetails.specific_address,
                locationDetails.ward_name,
                locationDetails.district_name,
                locationDetails.province_name
            ].filter(Boolean);

            locationDetails.full_address = addressParts.join(', ');

            return locationDetails;
        } catch (error) {
            console.error('Lỗi xử lý location:', error.message);
            return null;
        }
    },

    // 1. Tạo sản phẩm mới
    async createProduct(productData, files) {
        try {
            // Kiểm tra user, category
            const userExists = await User.findById(productData.user_id);
            if (!userExists) throw new Error("user_id không tồn tại");
            if (productData.category_id) {
                const categoryExists = await ProductCategory.findById(productData.category_id);
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

            // Xử lý location details
            if (productData.location_data) {
                const locationDetails = await this.processLocationDetails(JSON.parse(productData.location_data));
                if (locationDetails) {
                    productData.location_details = locationDetails;
                    productData.location = locationDetails.full_address; // Để tương thích với code cũ
                }
                delete productData.location_data; // Xóa field tạm thời
            }

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
            const product = await Product.findById(id)
                .populate('user_id', 'name email avatar_url phone')
                .populate('category_id', 'category_name description')
                .lean();
            if (!product) return null;

            // Tăng view count
            await Product.findByIdAndUpdate(id, { $inc: { view_count: 1 } });

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

            // Xử lý location details khi cập nhật
            if (updateData.location_data) {
                const locationDetails = await this.processLocationDetails(JSON.parse(updateData.location_data));
                if (locationDetails) {
                    updateData.location_details = locationDetails;
                    updateData.location = locationDetails.full_address; // Để tương thích với code cũ
                }
                delete updateData.location_data; // Xóa field tạm thời
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
            const products = await Product.find({ category_id: categoryId, status: 'active' })
                .populate('category_id', 'category_name description')
                .populate('user_id', 'name email')
                .lean();
            return products;
        } catch (error) {
            throw new Error("Lỗi khi lọc sản phẩm theo danh mục: " + error.message);
        }
    },

    // 7. Lấy sản phẩm liên quan (cùng category, khác sản phẩm hiện tại)
    async getRelatedProducts(productId, categoryId, limit = 4) {
        try {
            const products = await Product.find({
                _id: { $ne: productId },
                category_id: categoryId,
                status: 'active'
            })
                .populate('category_id', 'category_name description')
                .populate('user_id', 'name email')
                .limit(limit)
                .lean();
            return products;
        } catch (error) {
            throw new Error("Lỗi khi lấy sản phẩm liên quan: " + error.message);
        }
    },

};
