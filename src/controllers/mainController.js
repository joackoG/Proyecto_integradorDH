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
      
      const userLogged = req.session.usuario;
      const successMessage = req.session ? req.session.successMessage : undefined;
  
      if (req.session) {
        // Limpia la sesión después de obtener el mensaje
        delete req.session.successMessage;
        delete req.session.errorMessage;
      }
			
  
      res.render('index', { generos, productos, successMessage, userLogged});
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  

  login: (req, res) => {
    res.render('users/login'); 
  },

  register: (req, res) => {

  const userLogged=  null;
  
  res.render('users/register', {  userLogged });
},


  lists: async (req, res) => {
    try {
      const userLogged= req.session.usuario; 
      const admin = req.session.usuario.admin;
      if (admin) {
        console.log('admin', admin);
        return res.render('listsAdmin.ejs', {userLogged});
      } else {
        errorMessage='Usuario no es administrador';
        return res.redirect('/');

      }
    } catch (error) {
      console.error('Error al obtener el valor del campo admin:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
      
    
 };




module.exports = controller

