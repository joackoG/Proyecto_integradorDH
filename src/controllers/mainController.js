
const path = require('path')

const controllers = {
  index: (req, res) => {
    res.render('index'); // No es necesario proporcionar la ruta completa
  },
  login: (req, res) => {
    res.render('login'); // No es necesario proporcionar la ruta completa
  },
  register: (req, res) => {
    res.render('register'); // No es necesario proporcionar la ruta completa
  },
  car: (req, res) => {
    res.render('productCart'); // No es necesario proporcionar la ruta completa
  },
  detail: (req, res) => {
    res.render('productDetail'); // No es necesario proporcionar la ruta completa
  },


    // contact:  (req, res) => {
    //     res.send('Estas en la vista contacto')
    //   },
    // infoParams: (req, res) => {
    //   const params = req.params.id
    //   res.send('Estas consultando la info de ' + params)
    // }
}
module.exports = controllers

// productsRoutes
// usersRoutes
// mainRoutes
// producsControllers
// usersControllers
// mainControllers