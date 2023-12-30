
const controllers = {
    // Aqui van los metodos
    login: (req, res) => {
        res.render('login'); // No es necesario proporcionar la ruta completa
      },
    register: (req, res) => {
        res.render('register'); // No es necesario proporcionar la ruta completa
      },
      
    
}

module.exports = controllers;