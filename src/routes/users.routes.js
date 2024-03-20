// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Multer Require ************

const upload = require('../middlewares/usersMulter')

// ************ Controller Require ************
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/auth/authMiddleware");
const guestMiddleware = require("../middlewares/auth/guestMiddleware");

// ************Validate Require ************
const validateUsers = require('../middlewares/validateUsers');
const validateUsersEdit = require('../middlewares/validateUser-edit');
// const recuerdame = require('../middlewares/recuerdame');

/*** GET ALL PRODUCTS ***/ 
router.get('/login', guestMiddleware, userController.login); 
router.post('/login', userController.procesoLogin); 

router.get('/register', guestMiddleware, userController.register); 
router.post('/register', upload.single('fotoPerfil'),validateUsers , userController.nuevoRegistro);

router.get('/editUser/:id',authMiddleware, userController.editUser); 
router.put('/editUser/:id', upload.single('fotoPerfil'), validateUsersEdit ,userController.updateUser)

// perfil usuario
router.post('/logout',userController.logout)
router.get('/profile/',authMiddleware,userController.profile)





module.exports = router;