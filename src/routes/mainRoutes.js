const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/productCart', mainController.car); 
router.get('/productDetail', mainController.detail);

module.exports = router;