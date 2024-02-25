const path = require('path')

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