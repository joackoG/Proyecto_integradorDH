const db =require('../database/models');
const path = require('path')
const fs = require('fs');
const Producto = require('../database/models/Producto');
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {
	index: async (req, res) => {
    res.render('index');
	},
  login: (req, res) => {
    res.render('login'); // No es necesario proporcionar la ruta completa
  },
  register: (req, res) => {
    res.render('register'); // No es necesario proporcionar la ruta completa
  },
  // car: (req, res) => {
  //   res.render('productCart'); // No es necesario proporcionar la ruta completa
  // }


    // contact:  (req, res) => {
    //     res.send('Estas en la vista contacto')
    //   },
    // infoParams: (req, res) => {
    //   const params = req.params.id
    //   res.send('Estas consultando la info de ' + params)
    // }
}

module.exports = controller

