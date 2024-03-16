// ************ Require's ************
const express = require('express');
const router = express.Router();
// ************ multer Require ************
const upload = require('../middlewares/productMulter')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************Validate Require ************
const validateProducts = require('../middlewares/validateProducts');




/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
// router.post('/create', productsController.store); 
router.post('/create', upload.single('image'), validateProducts ,productsController.store )


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
// router.put('/edit/:id', productsController.update); 
router.put('/edit/:id', upload.single('image'), validateProducts, productsController.update )



/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:id', productsController.destroy);

// buscar producto

router.get('/search', productsController.search);


module.exports = router;
