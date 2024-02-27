// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

/*** GET ALL PRODUCTS ***/ 
router.get('/login', userController.login); 

router.get('/register', userController.register); 
router.post('/register', userController.nuevoRegistro); 





module.exports = router;