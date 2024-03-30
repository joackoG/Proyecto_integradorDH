const { body } = require('express-validator');
const db = require('../../database/models');
const path = require('path');

module.exports = [
    body('nombre').notEmpty().withMessage('El nombre de usuario no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Debe contener como minimo dos caracteres'),
    body('fechaNac').notEmpty().withMessage('La fecha de nacimiento no debe estar vacia').bail(),
    body('correo').notEmpty().withMessage('El correo electronico no debe estar vacio').bail()
    .isEmail().withMessage('Debe ingresar un correo electronico válido').bail()
    .custom(async (value, { req }) => {
        const usuario = await db.Usuario.findOne({ where: { correo: value } });
        if (usuario) {
            throw new Error('El correo electrónico ingresado ya se encuentra registrado');
        }
    }),

    body('password').notEmpty().withMessage('La contraseña no debe estar vacio').bail()
        .isLength({ min: 8 }).withMessage('Debe contener como minimo ocho caracteres'),

    
body('fotoPerfil').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];

    if (!file) {
        throw new Error('Tienes que subir una imagen');
    } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
    }

    return true;
})

]  