const express = require("express");
const router = express.Router();

// Mount từng module con cho product
router.use('/', require('../controllers/product/product.controller'));
router.use('/categories', require('../controllers/product/product.category.controller'));
const productController = require("../controllers/product.controller");
const { uploadImage } = require("../utils/cloudinary.util");
const validateImage = require("../middleware/imageValidation.middleware");

// Đăng sản phẩm (có ảnh)
router.post(
  "/",
  uploadImage.single("image"),
  validateImage,
  productController.createProduct
);

// Cập nhật trạng thái sản phẩm
router.put("/:id/status", productController.updateProductStatus);

// Lấy danh sách sản phẩm (có thể lọc theo category ?category=abc)
router.get("/", productController.getAllProducts);

// Lấy sản phẩm theo user
router.get("/user/:userId", productController.getProductsByUser);

// Lấy sản phẩm phổ biến
router.get("/popular", productController.getPopularProducts);

// Lấy chi tiết sản phẩm
router.get("/:id", productController.getProductById);


module.exports = router;
