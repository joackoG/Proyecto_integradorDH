// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

/*** GET ALL PRODUCTS ***/ 
router.get('/login', userController.login); 

router.get('/register', userController.register); 
router.post('/register', userController.nuevoRegistro); 

router.get('/editUser/:id', userController.editUser); 
router.put('/editUser/:id', userController.updateUser);

// perfil usuario
router.get('/logout')
router.get('/profile')




module.exports = router;