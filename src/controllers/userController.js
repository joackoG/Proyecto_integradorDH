const path = require('path')
const bd =require('../database/models');

const controllers = {
  // Aqui van los metodos
  login: (req, res) => {
    res.render('login');
  },
  register: (req, res) => {
    res.render('register');
    
  },


}

module.exports = controllers;