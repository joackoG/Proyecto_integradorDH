
const db = require('../../database/models');

module.exports = async (req, res, next) => {
    if (req.cookies && req.cookies.recuerdame !== undefined && req.session.usuario === undefined) {
        console.log('guardo?')

        try {
            let userFound = await db.Usuario.findOne({ where: { correo: req.cookies.recuerdame } });
            if (userFound) {
                delete userFound.password;
                req.session.usuario = userFound;
            }
        } catch (error) {
            console.error('Error al buscar usuario:', error);
        }
    }
    
    next();
};
