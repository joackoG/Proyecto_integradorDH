
const path = require('path')
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {
	index: (req, res) => {
		let oferta = products.filter(product => product.category == 'oferta')
		let nuevo = products.filter(product => product.category == 'nuevo')

		res.render('index.ejs', { oferta: oferta, nuevo: nuevo})
	},
  login: (req, res) => {
    res.render('login'); // No es necesario proporcionar la ruta completa
  },
  register: (req, res) => {
    res.render('register'); // No es necesario proporcionar la ruta completa
  },
  car: (req, res) => {
    res.render('productCart'); // No es necesario proporcionar la ruta completa
  }


    // contact:  (req, res) => {
    //     res.send('Estas en la vista contacto')
    //   },
    // infoParams: (req, res) => {
    //   const params = req.params.id
    //   res.send('Estas consultando la info de ' + params)
    // }
}

module.exports = controller

// productsRoutes
// usersRoutes
// mainRoutes
// producsControllers
// usersControllers
// mainControllers