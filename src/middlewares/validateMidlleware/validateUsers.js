const { body } = require('express-validator');
const db = require('../../database/models');

module.exports = [
    body('nombre').notEmpty().withMessage('El nombre de usuario no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Debe contener como minimo dos caracteres'),
    body('fechaNac').notEmpty().withMessage('La fecha de nacimiento no debe estar vacia').bail(),
    body('correo').notEmpty().withMessage('El correo electronico no debe estar vacio').bail()
    .isEmail().withMessage('El correo ingresado ya se encuentra registrado').bail()
    .custom(async (value, { req }) => {
        // Verifica si el correo ya existe en la base de datos
        const usuario = await db.Usuario.findOne({ where: { correo: value } });
        if (usuario) {
            throw new Error('El correo electrónico ingresado ya se encuentra registrado');
        }
    }),

    body('password').notEmpty().withMessage('La contraseña no debe estar vacio').bail()
        .isLength({ min: 8 }).withMessage('Debe contener como minimo ocho caracteres'),

]  