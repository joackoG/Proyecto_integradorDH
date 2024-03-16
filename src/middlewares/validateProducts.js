const { body } = require('express-validator');

module.exports = [
    body('nombreProd').notEmpty().withMessage('El nombre del producto no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Debe contener como minimo dos caracteres'),
    body('autor').notEmpty().withMessage('El autor del producto no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Debe contener como minimo dos caracteres'),
    body('generos_idGenero').notEmpty().withMessage('El genero del producto no debe estar vacio'),
    body('precio').notEmpty().withMessage('El precio del producto no debe estar vacio').bail()
        .isNumeric().withMessage('El precio del producto debe ser un numero'),

    body('descuento').notEmpty().withMessage('El descuento del producto no debe estar vacio').bail()
        .isNumeric().withMessage('El descuento del producto debe ser un numero'),

    body('stock').notEmpty().withMessage('El stock del producto no debe estar vacio').bail()
        .isNumeric().withMessage('El stock del producto debe ser un numero'),

]  