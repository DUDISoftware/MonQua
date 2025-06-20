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


module.exports = router;
