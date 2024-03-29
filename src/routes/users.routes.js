// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Multer Require ************

const upload = require('../middlewares/usersMulter')

// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************Validate Require ************
const validateUsers = require('../middlewares/validateMidlleware/validateUsers');
const validateUsersEdit = require('../middlewares/validateMidlleware/validateUser-edit');




/*** GET ALL PRODUCTS ***/ 
router.get('/login', userController.login); 
router.post('/login', userController.procesoLogin); 
router.post('/logout', userController.cerrarSesion);

router.get('/register', userController.register); 

router.post('/register', upload.single('fotoPerfil'),validateUsers , userController.nuevoRegistro);


router.get('/editUser/:id', userController.editUser); 
// router.put('/editUser/:id', userController.updateUser);
router.put('/editUser/:id', upload.single('fotoPerfil'), validateUsersEdit ,userController.updateUser)

// perfil usuario
// router.get('/logout')
router.get('/profile/:id', userController.profile)




module.exports = router;