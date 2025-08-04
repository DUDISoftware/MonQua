
const express = require("express");
const router = express.Router();
const productService = require("../../services/product/product.service");
const { uploadImage } = require("../../middleware/cloudinary.middleware");
const verifyToken = require("../../middleware/VerifyToken.middleware");
const { checkMultiRole } = require("../../middleware/checkRole.middleware");

// 1. Tạo sản phẩm mới
router.post("/create", verifyToken, checkMultiRole(["user", "admin"]), uploadImage.fields([
    { name: 'image_url', maxCount: 1 },
    { name: 'sub_images_urls', maxCount: 5 }
]), async (req, res) => {
    try {
        const productData = req.body;
        const files = req.files;
        productData.user_id = req.userData?.user?._id;

        // Log để debug
        console.log('Product data received:', productData);

        if (!productData || !productData.title || !productData.category_id) {
            return res.status(400).json({ error: 400, error_text: "Thiếu dữ liệu sản phẩm", data: [] });
        }
        const newProduct = await productService.createProduct(productData, files);
        return res.status(201).json({ error: 0, error_text: "Tạo sản phẩm thành công", data: [newProduct] });
    } catch (error) {
        console.error("Lỗi tạo sản phẩm:", error.message);
        return res.status(500).json({ error: 500, error_text: error.message || "Lỗi tạo sản phẩm.", data: [] });
    }
});

// 2. Lấy danh sách sản phẩm
router.get("/list", async (req, res) => {
    try {
        const filters = req.query || {};
        const products = await productService.getAllProducts(filters);
        return res.status(200).json({ error: 0, error_text: "Lấy danh sách sản phẩm thành công", data: products });
    } catch (error) {
        console.error("Lỗi lấy danh sách sản phẩm:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy danh sách sản phẩm.", data: [] });
    }
});

// 3. Lấy chi tiết sản phẩm
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: 400, error_text: "ID sản phẩm không hợp lệ", data: [] });
        }
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy sản phẩm", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Lấy chi tiết sản phẩm thành công", data: [product] });
    } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy chi tiết sản phẩm.", data: [] });
    }
});

// 4. Cập nhật sản phẩm
router.put("/:id", verifyToken, checkMultiRole(["user", "admin"]), uploadImage.fields([
    { name: 'image_url', maxCount: 1 },
    { name: 'sub_images_urls', maxCount: 5 }
]), async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const files = req.files;
        if (!id || !updateData) {
            return res.status(400).json({ error: 400, error_text: "Dữ liệu cập nhật không hợp lệ", data: [] });
        }
        // Nếu image_url là rỗng/null, xóa ảnh trên Cloudinary
        if (updateData.image_url === '' || updateData.image_url === null) {
            const product = await productService.getProductByIdSv(id);
            if (product && product.image_url) {
                const publicId = product.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
                const { deleteImageFromCloudinary } = require('../../middleware/cloudinary.middleware');
                await deleteImageFromCloudinary(publicId);
                updateData.image_url = null;
            }
        }
        const updatedProduct = await productService.updateProduct(id, updateData, files);
        if (!updatedProduct) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy sản phẩm", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Cập nhật sản phẩm thành công", data: [updatedProduct] });
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi cập nhật sản phẩm.", data: [] });
    }
});

// 5. Xóa sản phẩm
router.delete("/:id", verifyToken, checkMultiRole(["user", "admin"]), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 400, error_text: "ID sản phẩm không hợp lệ", data: [] });
        }
        const deletedProduct = await productService.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy sản phẩm", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Xóa sản phẩm thành công", data: [deletedProduct] });
    } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi xóa sản phẩm.", data: [] });
    }
});
// 6. Lọc sản phẩm theo danh mục
router.get("/category/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return res.status(400).json({ error: 400, error_text: "ID danh mục không hợp lệ", data: [] });
        }
        const products = await productService.getProductsByCategory(categoryId);
        return res.status(200).json({ error: 0, error_text: "Lấy sản phẩm theo danh mục thành công", data: products });
    } catch (error) {
        console.error("Lỗi lấy sản phẩm theo danh mục:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy sản phẩm theo danh mục.", data: [] });
    }
});

// 7. API location - Lấy danh sách tỉnh/thành
router.get("/location/provinces", async (req, res) => {
    try {
        const axios = require('axios');
        const response = await axios.get("https://provinces.open-api.vn/api/p/");
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách tỉnh/thành thành công",
            data: response.data
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách tỉnh/thành:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi lấy danh sách tỉnh/thành.",
            data: []
        });
    }
});

// 8. API location - Lấy danh sách quận/huyện theo tỉnh
router.get("/location/districts/:provinceCode", async (req, res) => {
    try {
        const { provinceCode } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách quận/huyện thành công",
            data: response.data.districts || []
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách quận/huyện:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi lấy danh sách quận/huyện.",
            data: []
        });
    }
});

// 9. API location - Lấy danh sách xã/phường theo quận
router.get("/location/wards/:districtCode", async (req, res) => {
    try {
        const { districtCode } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách xã/phường thành công",
            data: response.data.wards || []
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách xã/phường:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi lấy danh sách xã/phường.",
            data: []
        });
    }
});

// 8. Lấy sản phẩm liên quan
router.get("/:id/related", async (req, res) => {
    try {
        const productId = req.params.id;
        const { limit = 4 } = req.query;

        // Lấy thông tin sản phẩm hiện tại để biết category
        const currentProduct = await productService.getProductById(productId);
        if (!currentProduct) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy sản phẩm", data: [] });
        }

        const relatedProducts = await productService.getRelatedProducts(
            productId,
            currentProduct.category_id?._id || currentProduct.category_id,
            parseInt(limit)
        );

        return res.status(200).json({
            error: 0,
            error_text: "Lấy sản phẩm liên quan thành công",
            data: relatedProducts
        });
    } catch (error) {
        console.error("Lỗi lấy sản phẩm liên quan:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy sản phẩm liên quan.", data: [] });
    }
});

module.exports = router;
