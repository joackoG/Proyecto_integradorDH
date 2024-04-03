// ************ Require's ************
const express = require('express');
const router = express.Router();
// ************ multer Require ************
const upload = require('../middlewares/multerMiddleware/productMulter')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************Validate Require ************
const validateProducts = require('../middlewares/validateMiddleware/validateProducts');

const requireLogin = require('../middlewares/authMiddleware/autenticacion'); 
const viewAdmin = require('../middlewares/authMiddleware/loggedAdminMiddleware')






/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', requireLogin, productsController.create); 
// router.post('/create', productsController.store); 
router.post('/create', requireLogin, upload.single('image'), validateProducts ,productsController.store )


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', requireLogin, productsController.edit); 
// router.put('/edit/:id', productsController.update); 
router.put('/edit/:id', requireLogin, upload.single('image'), validateProducts, productsController.update )



/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:id', requireLogin, productsController.destroy);

// buscar producto

router.get('/search', productsController.search);

// Lista de productos
router.get('/productsList',requireLogin, viewAdmin, productsController.productsList);
router.post('/productDeleteAdmin/:id', requireLogin, viewAdmin, productsController.productDeleteAdmin);


module.exports = router;
