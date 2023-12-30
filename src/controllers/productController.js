// const path = require('path')
const controllers = {
    car: (req, res) => {
        res.render('productCart.ejs'); // No es necesario proporcionar la ruta completa
      },
      detail: (req, res) => {
        res.render('productDetail.ejs'); // No es necesario proporcionar la ruta completa
      },
}
module.exports = controllers;