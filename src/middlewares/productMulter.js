const path = require('path');
const multer = require('multer');


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

module.exports = upload;