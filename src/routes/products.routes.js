const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// aqui van las rutas

router.get('/productCart', productController.car); 
router.get('/productDetail', productController.detail);

module.exports = router;