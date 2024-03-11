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

/*** GET ALL PRODUCTS ***/ 
router.get('/login', userController.login); 
router.post('/login', userController.procesoLogin); 
router.post('/logout', userController.cerrarSesion);

router.get('/register', userController.register); 
// router.post('/register', userController.nuevoRegistro); 
router.post('/register', upload.single('fotoPerfil'),userController.nuevoRegistro)


router.get('/editUser/:id', userController.editUser); 
// router.put('/editUser/:id', userController.updateUser);
router.put('/editUser/:id', upload.single('fotoPerfil'),userController.updateUser)

// perfil usuario
// router.get('/logout')
router.get('/profile/:id', userController.profile)




module.exports = router;