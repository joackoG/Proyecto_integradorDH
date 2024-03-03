// ************ Require's ************
const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');


// ************ Controller Require ************
const productsController = require('../controllers/productsController');


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../Public/img/imgProducto'))
    },
    filename:(req, file, cb )=>{
        console.log(file);
        const newFilename = 'prod-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename)
    }
});
const upload = multer({storage: storage});
/*** GET ALL PRODUCTS ***/ 
// router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
// router.post('/create', productsController.store); 
router.post('/create', upload.single('image'),productsController.store )



/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
// router.put('/edit/:id', productsController.update); 
router.put('/edit/:id', upload.single('image'),productsController.update )



/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:id', productsController.destroy);

// buscar producto

router.get('/search', productsController.search);


module.exports = router;
