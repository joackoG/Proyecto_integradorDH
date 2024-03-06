const db =require('../database/models');
const path = require('path')
const fs = require('fs');
// const Producto = require('../database/models/Producto');
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {

  index: async (req, res) => {
    try {
   

      const productos = await db.Producto.findAll();
      const generos = await db.Genero.findAll();

             // Verifica si req.session está definido antes de intentar acceder a req.session.successMessage
             const successMessage = req.session ? req.session.successMessage : undefined;
        
             if (req.session) {
                 // Limpia la sesión después de obtener el mensaje
                 delete req.session.successMessage;
             }
      res.render('index', { generos: generos, productos: productos, successMessage  });


    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  login: (req, res) => {
    res.render('login'); // No es necesario proporcionar la ruta completa
  },
  register: (req, res) => {
    res.render('register'); // No es necesario proporcionar la ruta completa
  },





};

module.exports = controller

