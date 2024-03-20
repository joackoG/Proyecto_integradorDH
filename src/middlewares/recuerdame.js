const db = require('../database/models');

module.exports = (req, res, next) => {
    if (req.cookies && req.cookies.recuerdame !== undefined && req.session.usuario === undefined) {
        console.log('guardo?')

        let userFound = db.Usuario.find(usuario => usuario.correo === req.cookies.recuerdame);
        if (userFound) {
            delete userFound.password;
            req.session.usuario = userFound;
        }
    }
    
    next();
};
