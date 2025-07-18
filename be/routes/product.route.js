const express = require('express');
const router = express.Router();

// Mount từng module con cho product
router.use('/', require('../controllers/product/product.controller'));
router.use('/categories', require('../controllers/product/product.category.controller'));

module.exports = router;
