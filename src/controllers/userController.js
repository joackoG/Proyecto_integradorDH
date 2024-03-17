const path = require('path');
const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { production } = require('../database/config/config');
const { log } = require('console');
const uploadDir = path.join(__dirname, '../Public/img/imgUsuario');
const fs = require('fs');
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");




const controllers = {
  login: async (req, res) => {
    const usuario = await req.session.usuario;
    res.render('login', { successMessage: null, errorMessage: null, usuario });


  }, procesoLogin: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.render("users/login", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
  
      const { correo, password } = req.body;
      const userToLogin = await db.Usuario.findOne({ where: { correo: correo } });
  
      if (!userToLogin) {
        const errorMessage = 'Credenciales incorrectas';
        return res.render('login', { errorMessage });
      }
  
      const isOkThePassword = bcryptjs.compareSync(password, userToLogin.password);
  
      if (!isOkThePassword) {
        const errorMessage = 'Credenciales incorrectas';
        return res.render('login', { errorMessage });
      }
  
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
  
      if (req.body.remember_user) {
        res.cookie("userEmail", req.body.email, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
        });
      }
  
      console.log("Usuario logueado:", userToLogin.nombre);
      return res.redirect('profile');
    } catch (error) {
      console.error('Error al manejar el inicio de sesión:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  cerrarSesion: async (req, res) => {

    try {
      const generos = await db.Genero.findAll();
      const productos = await db.Producto.findAll();

      if (req.session.usuario) {
        req.session.destroy();

        const successMessage = `Su sesion se ha cerrado`;
        res.render('index', { generos, productos, successMessage, usuario: null });
      } else {
        const successMessage = `No hay usuario autenticado`;
        res.render('index', { generos, productos, successMessage, usuario: null });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).send('Error interno del servidor');
    }


  },

  register: (req, res) => {


    const usuario = null;
    res.render('register', { usuario });
    // res.render('register');
  },

  nuevoRegistro: async (req, res) => {
    try {
      const usuario = req.session.usuario;

      console.log('paso uno');
      // const fotoPerfil = req.file ? req.file.filename : 'default-image.png';
      const nuevoUsuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        fechaNac: req.body.fechaNac,
        password: bcryptjs.hashSync(req.body.password, 10),
        fotoPerfil: req.file ? req.file.filename : 'default-image.png',
      };

      if (Object.values(nuevoUsuario).some(campo => !campo)) {
        const errorMessage = 'Debe completar todos los campos';
        res.render('register', { errorMessage, usuario });
      } else {
        // const crearRegistro = await db.Usuario.create(nuevoUsuario);
        const crearRegistro = await db.Usuario.create(nuevoUsuario);

        if (crearRegistro) {
          // console.log('paso')
          const successMessage = `Se ha registrado exitosamente a: ${crearRegistro.nombre}`;
          res.render('login', { successMessage: successMessage, usuario });

        } else {
          const errorMessage = 'datos incorrectos';
          res.render('login', { errorMessage: errorMessage, usuario });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error interno del servidor al procesar el registro: ${error.message}`);
    }
  },

  editUser: async (req, res) => {
    try {
      
        // En tu controlador de usuarios (userController.js)
        
            // Obtener el usuario actualmente logueado de req.session.userLogged
    
        
            // Renderizar la vista del formulario de edición de usuario
  
          
     
      const usuario = await db.Usuario.findByPk(req.session.userLogged.id);

      if (usuario) {

        res.render('userEdit-form', { usuario: usuario });


      } else {
        return res.status(404).send('usuario  no encontrado')
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const productos = await db.Producto.findAll();
      const generos = await db.Genero.findAll();

      const id = req.params.id;
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {
				if (req.file && req.file.filename) {
					if (usuario.fotoPerfil && usuario.fotoPerfil !== 'default-image.png') {
						const oldImagePath = path.join(uploadDir, usuario.fotoPerfil);

						if (fs.existsSync(oldImagePath)) {
							fs.unlinkSync(oldImagePath);
						} else {
							console.warn(`La imagen ${usuario.fotoPerfil} no existe en el sistema de archivos.`);
						}
					}

					usuario.fotoPerfil = req.file.filename;
				}


        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.fechaNac = req.body.fechaNac || usuario.fechaNac;
        usuario.correo = req.body.correo || usuario.correo;
        usuario.password = req.body.password || usuario.password;
				usuario.fotoPerfil = req.file.filename|| usuario.fotoPerfil;


        await usuario.save();
        const successMessage = `Edición exitosa de: ${usuario.nombre}`;
        // const usuario = req.session.usuario;
        res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });

      } else {
        const errorMessage = 'Usuario no encontrado';
        const usuario = req.session.usuario;
        res.render('index', { generos: generos, errorMessage, usuario });


      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  profile: async (req, res) => {
    try {
      const id = req.session.userLogged.id
      console.log(id)
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {

        res.render('./profile.ejs', { usuario });

      } else {
        return res.status(404).send('usuario  no encontrado')
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

  },
logout: (req, res) => {
  res.clearCookie("userEmail");
  req.session.destroy();
  return res.redirect('index');
},
  // logout: (req, res) => {
  //   // req.session.destroy()
  //   req.session.userLogged = undefined //borrar session
  //   res.clearCookie('rememberme') //borrar cookie
  //   res.redirect('/')
  // }
  // proceso de login
  // if(rememberme == 'on'){
  //   res.cookie('rememberme', userFound.email, {maxAge: 60000 * 60})
  // }
};



module.exports = controllers;
