const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { uploadImage } = require("../utils/cloudinary.util"); // Đường đúng
const validateImage = require("../middleware/imageValidation.middleware");

// POST /api/products => đăng sản phẩm có ảnh
router.post(
  "/",
  uploadImage.single("image"),
  validateImage,
  productController.createProduct
);


router.put("/:id/status", productController.updateProductStatus);

// Lấy danh sách sản phẩm
router.get("/", productController.getAllProducts);
// Lấy dsach sản phẩm theo user
router.get("/user/:userId", productController.getProductsByUser);
// Lấy chi tiết sản phẩm theo ID
router.get("/:id", productController.getProductById);


module.exports = router;
