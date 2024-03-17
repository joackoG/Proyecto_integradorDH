// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Public/img/imgUsuario'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });
// ************ Controller Require ************
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/auth/authMiddleware");
const guestMiddleware = require("../middlewares/auth/guestMiddleware");

/*** GET ALL PRODUCTS ***/ 
router.get('/login', guestMiddleware, userController.login); 
router.post('/login', userController.procesoLogin); 

router.get('/register', guestMiddleware, userController.register); 
router.post('/register', userController.nuevoRegistro); 

router.get('/editUser/:id',authMiddleware, userController.editUser); 
router.post('/editUser/:id',authMiddleware, userController.updateUser);

// perfil usuario
router.get('/logout',userController.cerrarSesion)
router.get('/profile/',authMiddleware,userController.profile)





module.exports = router;