const path = require('path');
const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');

const controllers = {
  // Aquí van los métodos
  login: (req, res) => {
    res.render('login');
  },
  register: (req, res) => {
    console.log('paso');

    res.render('register');
  },

  nuevoRegistro: async (req, res) => {
    try {
      console.log('paso');
      const nuevoUsuario = {
        ...req.body,
        password: uuidv4(),
      };

      // Crea el nuevo usuario en la base de datos usando Sequelize
    
      const crearRegistro = await db.Usuario.create(nuevoUsuario);

      console.log("Registro creado:", crearRegistro);
      // res.render('login');
      res.status(201).send("Registro exitoso"); 

    } catch (error) {
      console.error(error);
      res.status(500).send(`Error interno del servidor al procesar el registro: ${error.message}`);
    }
  }
};

module.exports = controllers;
