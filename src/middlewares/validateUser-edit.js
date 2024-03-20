const { body } = require('express-validator');


module.exports = [
    body('nombre').notEmpty().withMessage('El nombre de usuario no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Debe contener como minimo dos caracteres'),
    body('fechaNac').notEmpty().withMessage('La fecha de nacimiento no debe estar vacia').bail(),
    body('password').notEmpty().withMessage('La contraseña no debe estar vacio').bail()
        .isLength({ min: 8 }).withMessage('Debe contener como minimo ocho caracteres'),

]  